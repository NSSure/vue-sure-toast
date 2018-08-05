/*
API Options (Can be override from show call)
- openDelay = 0
- enableManualDismiss = true
- position (top-left, top-right, bottom-right, bottom-left, top, bottom)
- limit = 0
*/
//import SureToastComponent from './vue-sure-toast.vue';
import SureToastManager from './toast-manager';

require('./vue-sure-toast.css');

const SureToast = {
    install(Vue) {
        // Vue.component('SureToastComponent', SureToastComponent);
        Vue.prototype.$sureToast = new SureToastManager();
    }
}

export default SureToast;