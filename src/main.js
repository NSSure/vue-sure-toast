import Vue from 'vue'
import App from './app.vue'

import SureToast from '../dist/vue-sure-toast.min';

Vue.use(SureToast, { 
  position: 'bottom-right', 
  limit: 10,
  persist: false,
  reverseToastOrder: false,
  enableManualDismiss: false,
  persist: true,
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