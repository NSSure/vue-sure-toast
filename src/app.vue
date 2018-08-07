<template>
  <div id="app">
    <label class="demo-title">Vue Sure Toast Demo</label>
    <p class="demo-detail">Displaying the built in themed toasts using the default plugin options.</p>
  </div>
</template>

<script>
export default {
    created() {
      this.$sureToast.show('Default toast theme', 'fa fa-info-circle', {
        enableManualDismiss: true,
        position: 'top-left',
        actions: [
          { 
            text: 'Default1', 
            onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
          },
          { 
            text: 'Default2', 
            onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
          }
        ]
      });

      this.$sureToast.show('Default toast theme', 'fa fa-info-circle', {
        enableManualDismiss: true,
        onOpened() {
          console.log('toast opened (toast level)');
        },
        action: {
          text: 'Default1', 
          onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
        }
      });

      this.$sureToast.show('Success toast theme', 'fa fa-info-circle', {
        enableManualDismiss: true,
        theme: 'success',
        action: { 
          text: 'Success1', 
          onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
        }
      });

      this.$sureToast.show('Warning toast theme', 'fa fa-info-circle', {
        enableManualDismiss: true,
        theme: 'warning',
        action: { 
          text: 'Warning1', 
          onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
        }
      });

      this.$sureToast.show('Error toast theme', 'fa fa-info-circle', {
        enableManualDismiss: true,
        theme: 'error',
        action: { 
          text: 'Error1', 
          onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
        }
      });
      
      this.$sureToast.show('Info toast theme', 'fa fa-info-circle', {
        enableManualDismiss: true,
        theme: 'info',
        action: { 
          text: 'Info1', 
          onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
        }
      });
    }
}
</script>

<style>
  html, body {
    font-family: Verdana, Geneva, sans-serif;
    padding: 25px;
    font-size: 12px;
  }

  .demo-title {
    font-size: 2rem;
  }

  .demo-detail {
    font-size: 1.25rem;
  }
</style>


