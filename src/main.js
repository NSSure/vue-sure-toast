import Vue from 'vue'
import App from './App.vue'
import SureToast from './sure-toast';

Vue.use(SureToast, {
  openDelay: 0,
  enableManualDismiss: false,
  type: 'stretch',
  position: 'bottom',
  theme: 'error'
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app')
