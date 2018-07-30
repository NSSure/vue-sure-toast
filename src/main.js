import { VueSureToast } from './vue-sure-toast';
import ToastComponent from './vue-sure-toast.vue';

const SureToast = {
  install: (Vue, options) => {
    if(!options) {
      options = {};
    }

    let instance = new VueSureToast()
    Vue.component('vue-sure-toast', ToastComponent);
    Vue.sureToast = Vue.prototype.$sureToast = instance;
  }
};

alert("TEST");

export default SureToast;
