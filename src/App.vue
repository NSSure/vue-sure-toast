<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$sureToast.show('TOAST CONTENT', 'fa fa-check fa-lg', {
      interval: 5000,
      enableManualDismiss: true,
      action: { text: 'DISMISS', icon: 'fa fa-user', onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } }
    });
  }
}
</script>

<style src="./sure-toast.css" lang="css">

</style>
