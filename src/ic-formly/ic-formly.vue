<template lang="html">
  <form
    ref="form"
    novalidate
    @submit.prevent="onFormSubmission">
    <formly-form
      ref="formlyForm"
      :form="flattenForm"
      :model="flattenModel"
      :fields="fields"
      />
      <input
        ref="submitBtn"
        type="submit"
        style="display: none;"/>
  </form>
</template>

<script>
import Vue from 'vue'
import VueFormly from 'vue-formly'
import VueFormlyBootstrap from 'vue-formly-bootstrap'
import {flatten, unflatten} from 'flat'

// FIXME: Cannot parse src/ic-formly/ic-formly.vue: TypeError: _vue2.default.use is not a function
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);

function createModel() {
  let flatted = this
    .$options
    .propsData
    .fields
    .reduce((o, f) => {
      o[f.key] = "";
      return o;
    }, {});
  return unflatten(flatted);
}

export default {
  name: 'ic-formly',
  props: {
    /**
     * Data model (the default values),
     * it will not be changed by the form.
     * You can also skip value and use v-model instead
     */
    value: {
      type: Object,
      default: null
    },
    /**
     * Form field mapping. You can map to deeper properties
     * using dot notation in key attribute `object.prop.insideprop`
     * More details in {@link https://matt-sanders.gitbooks.io/vue-formly/content/v/2.0/how_to_use/properties_and_options.html|Formly Docs}
     */
    fields: {
      type: Array,
      required: true
    },
    /**
     * The required error message
     */
    requiredMessage: {
      type: String,
      default: 'Required field'
    }
  },
  computed: {
    computedValue: {
      get: function() {
        return this.value || this.emptyModel;
      },
      set: function(val) {
        this.emptyModel = this.createModel();
      }
    },
    flattenModel: function() {
      return flatten(this.computedValue)
    }
  },
  data: () => ({
    emptyModel: createModel,
    flattenForm: {},
    $formly: Vue.$formly,
  }),
  methods: {
    onFormSubmission() {
      // formlyForm validates sync, even after validate
      // workaround: watch flattenForm$valid for changes
      this.$refs.formlyForm.validate()
      .then(() => new Promise(resolve => {
        let unwatch = this.$watch(
          'flattenForm.$valid',
          valid => resolve({valid, unwatch})
        );
        setTimeout(() => resolve({
          valid: this.flattenForm.$valid,
          unwatch
        }, 1));
      }))
      .then(({valid, unwatch}) => {
        unwatch();
        if (!valid) {
          /**
           * Is sent when form is submitted and validation errors occours
           * @event error
           * @type {object} An object which will hold the current state of the form. This will be populated by Vue Formly.
           */
          this.$emit('error', unflatten(this.flattenForm));
        } else {
          /**
          * Input event occurs when form is submitted without
          * validation errors
          * @event input
          * @type {object} Data model
          */
          this.$emit('input', unflatten(this.flattenModel));

          // resets computedValue after submission
          this.reset();
        }
      })
      .catch(e => {
        // When user input invalid validations
        throw new Error(e);
      });
    },
    /**
     * Programatically submit form
     */
    submit() {
      this.$refs.submitBtn.click();
    },
    /**
     * Programatically reset form
     */
    reset() {
      this.computedValue = this.value || this.createModel();
    },
    /**
     * Create an empty model, based on fields
     * @return {object} the created model
     */
    createModel
  },
  created() {
    Vue.$formly.addValidationMessage('required', this.requiredMessage);
  }
}
</script>
