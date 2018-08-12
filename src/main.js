import Vue from 'vue'
import App from './app.vue'

import SureToast from '../dist/vue-sure-toast.min';

Vue.use(SureToast, { 
  limit: 5,
  position: 'top-right',
  persist: false,
  reverseToastOrder: false,
  enableManualDismiss: false,
  onClosed() {
    console.log('toast closed');
  },
  onOpened() {
    console.log('toast opened');
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
}).$mount('#app')