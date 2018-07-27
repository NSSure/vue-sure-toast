<template>
  <div id="app">
    <button v-on:click="showToast()">Show Toast</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.showToast();
  },
  methods: {
    showToast() {
      this.$sureToast.show('Settings updated successfully', 'fa fa-info-circle', {
        interval: 5000,
        enableManualDismiss: true,
        action: { text: 'DISMISS', onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } }
      });
    }
  }
}
</script>

<style src="./sure-toast.css" lang="css">

</style>
