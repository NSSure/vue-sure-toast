<template>
  <div id="app">
    <h1>Hello World!</h1>
  </div>
</template>

<script>
export default {
    created() {
      this.$sureToast.show('Settings updated successfully', 'fa fa-info-circle', {
        interval: 500000,
        enableManualDismiss: true,
        action: { 
          text: 'DISMISS', 
          onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
        }
      });
    }
}
</script>
