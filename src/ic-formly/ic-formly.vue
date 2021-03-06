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
import {flatten, unflatten} from 'flat'

function createModel() {
  let flatted = this
    .$options
    .propsData
    .fields
    .reduce((o, f) => {
      o[f.key] = "";
      return o;
    }, {});
  return unflatten(flatted, {overwrite: true});
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
          this.$emit('error', unflatten(this.flattenForm, {overwrite: true}));
        } else {
          /**
          * Input event occurs when form is submitted without
          * validation errors
          * @event input
          * @type {object} Data model
          */
          this.$emit('input', unflatten(this.flattenModel, {overwrite: true}));

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
     * Programatically validates form
     */
    validate() {
      this.$refs.formlyForm.validate();
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
    createModel,
  },
  mounted() {
    // Listen on each field for changes and validates individually
    const formly = this.$refs.formlyForm;
    Object.keys(formly.$refs).forEach(ref => {
      formly.$refs[ref].$el.addEventListener('change', () => {
        formly.$refs[ref].validate();
      });
    });
  }
}
</script>
