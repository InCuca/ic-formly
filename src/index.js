import VueFormly from 'vue-formly'
import VueFormlyBootstrap from 'vue-formly-bootstrap'
import IcFormly from './ic-formly/ic-formly.vue';

let Formly = {
  getTypes: VueFormly.getTypes,
  addType: VueFormly.addType,
  addValidationMessage: VueFormly.addValidationMessage,
  install(Vue, options) {

    // install Vueformly
    VueFormly.install(Vue, options)
    VueFormlyBootstrap.install(Vue, options)

    // add our components
    Vue.component('ic-formly', IcFormly)
  }
};

//auto install
if (typeof window !== 'undefined' && window.Vue) {
  setTimeout(() => console.log(window.Vue), 3000)

  window.Vue.use(Formly);
  //expose formly functions if auto installed
  window.Vue.$formly = {
    getTypes: VueFormly.getTypes,
    addType: VueFormly.addType,
    addValidationMessage: VueFormly.addValidationMessage
  };
}


export default Formly;
