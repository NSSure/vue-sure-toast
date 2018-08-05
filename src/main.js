import Vue from 'vue'
import App from './app.vue'

import SureToast from '../dist/vue-sure-toast.min';

Vue.use(SureToast);

new Vue({
  el: '#app',
  render: h => h(App)
}).$mount('#app')