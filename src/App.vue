<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <a class="btn btn-default float-right" href="https://github.com/NSSure/vue-sure-toast" role="button"><i class="fab fa-github"></i> Source Code</a>
      </div>
    </div>
    <div class="jumbotron">
      <h1 class="display-4">Vue Sure Toast</h1>
      <p class="lead">Vue Sure Toast is a simple VueJS toast plugin. This plugin contains built in features for theming, position, and more. See below for a full list of features.</p>
    </div>

    <div class="form-group">
      <button type="button" class="btn btn-secondary mr-2" v-on:click="showToast()">Show Toast</button>
      <button type="button" class="btn btn-danger mr-2" v-on:click="$sureToast.dismissAll()">Clear Toasts</button>

      <button type="button" class="btn btn-default float-right" v-on:click="resetDefaults()">Reset Defaults</button>
    </div>

    <hr>

    <div class="form-group">
      <label>Toast Message</label>
      <input type="text" class="form-control" v-model="message" />
    </div>

    <div class="form-group">
      <label>Position</label>
      <select class="form-control" v-model="options.position">
        <option>top-left</option>
        <option>top-right</option>
        <option>bottom-left</option>
        <option>bottom-right</option>
        <option>top</option>
        <option>bottom</option>
      </select>
    </div>

    <div class="form-group">
      <label>Theme</label>
      <select class="form-control" v-model="options.theme">
        <option>default</option>
        <option>success</option>
        <option>error</option>
        <option>info</option>
        <option>warning</option>
      </select>
    </div>

    <div class="form-group">
      <label>Toast Limit</label>
      <input type="number" class="form-control" v-model="options.limit" />
    </div>

    <div class="form-group">
      <label>Interval (milliseconds)</label>
      <input type="number" class="form-control" v-model="options.interval" />
    </div>

    <div class="form-group">
      <label>Delay Open</label>
      <input type="number" class="form-control" v-model="options.delayOpen" />
    </div>

    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" v-model="options.enableManualDimiss" />
      <label class="form-check-label">Enable Manual Dismiss</label>
    </div>

    <hr>

    <div class="form-group">
      <h3>Options</h3>
      <p class="lead">Below is a full list of the available options for both the defaults and individual toasts.</p>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Option</th>
          <th>Type</th>
          <th>Values</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>openDelay</td>
          <td>number</td>
          <td>any number (milliseconds)</td>
          <td>5000ms</td>
        </tr>
        <tr>
          <td>enableManualDismiss</td>
          <td>boolean</td>
          <td>true, false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>position</td>
          <td>string</td>
          <td>'top-left', 'top-right', 'bottom-right', 'bottom-left', 'top', 'bottom'</td>
          <td>'top-right'</td>
        </tr>
        <tr>
          <td>theme</td>
          <td>string</td>
          <td>'success', 'error', 'info', 'warning', 'default'	</td>
          <td>'default'</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.showToast();
  },
  data: function() {
    return {
      message: 'Toast Message',
      options: {
        position: 'top-left',
        theme: 'default',
        limit: 3,
        interval: 5000,
        delayOpen: 0,
        enableManualDismiss: false
      }
    }
  },
  methods: {
    showToast() {
      this.options.action = { text: 'DISMISS', onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } }
      this.$sureToast.show(this.message, 'fa fa-info-circle', Object.assign({}, this.options));
    }
  }
}
</script>

<style>
  html, body {
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
      margin: 15px;
  }

  .lead {
    margin-bottom: 0;
  }
</style>

<style src="./sure-toast.css" lang="css">

</style>
