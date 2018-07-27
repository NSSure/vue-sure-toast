import Vue from 'vue'
import App from './App.vue'
import SureToast from './sure-toast';

/*
API Options (Can be override from show call)
- openDelay = 0
- enableManualDismiss = true
- position (top-left, top-right, bottom-right, bottom-left, top, bottom)
*/

Vue.use(SureToast, {
  openDelay: 0,
  enableManualDismiss: false,
  position: 'top-right',
  theme: 'default',
  limit: 3
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app')
