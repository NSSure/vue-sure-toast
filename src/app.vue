<template>
  <div id="app">
    <div class="container">
        <div class="card bg-light my-4">
          <div class="card-body">
            <h3>Vue Sure Toast Demo</h3>
            <hr>
            <p class="demo-detail">Displaying the built in themed toasts using the default plugin options.</p>
            <div class="plugin-configuration">
              <div class="form-inline">
                <div class="form-group mr-2">
                  <select v-model="rootPosition" @change="changePosition()" class="form-control">
                    <option v-for="position of $sureToast.positions" :key="position">{{position}}</option>
                  </select>
                </div>
                <button type="button" class="btn btn-default mr-2" @click="showToast()">Show Toast</button>
                <button type="button" class="btn btn-default mr-2" @click="$sureToast.dismissAll()">Clear All</button>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            Toast Configuration
          </div>
          <div class="card-body">
            <div class="form">
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Toast Title</label>
                    <input type="text" v-model="toastTitle" class="form-control" placeholder="Title" />
                  </div>
                  <div class="form-group">
                    <label>Toast Message</label>
                    <input type="text" v-model="toastMessage" class="form-control" placeholder="Message" />
                  </div>

                  <div class="form-group">
                    <label>Toast Theme</label>
                    <select v-model="toastTheme" class="form-control">
                      <option v-for="theme of $sureToast.themes" :key="theme">{{theme}}</option>
                    </select>
                  </div>

                  <div class="form-group from-check">
                    <input type="checkbox" id="toastPersist" v-model="toastPersist" />
                    <label class="form-check-label" for="toastPersist">Persist Toast</label>
                    <small class="form-text text-muted">Permanently persists the toast until the toast is manually dismissed</small>
                  </div>

                  <div class="form-group from-check">
                    <input type="checkbox" id="toastManualDismiss" v-model="toastManualDismiss" />
                    <label class="form-check-label" for="toastManualDismiss">Manual Dismiss</label>
                    <small class="form-text text-muted">Allows clicks on the toast to dismiss the toast</small>
                  </div>

                  <div class="form-group from-check">
                    <input type="checkbox" id="toastProgressBar" v-model="toastProgressBar" />
                    <label class="form-check-label" for="toastProgressBar">Progress Bar</label>
                    <small class="form-text text-muted">Displays a progress bar displaying the remaining toast interval</small>
                  </div>

                  <div class="form-group">
                    <label>Toast Interval (ms)</label>
                    <input type="text" v-model="toastInterval" class="form-control" placeholder="Title" />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div class="form-group">
                    <label>Toast Message</label>
                    <input type="text" v-model="actionText" class="form-control" placeholder="Message" />
                  </div>
                  <div class="form-group">
                    <button type="button" class="btn btn-default" v-on:click="addAction()" :disabled="!actionText">Add Action</button>
                    <button type="button" class="btn btn-default" v-on:click="actions = []">Clear All</button>
                  </div>
                  <div class="card">
                    <div class="card-header">
                      Toast Actions
                    </div>
                    <ul class="list-group list-group-flush">
                      <li v-for="(action, index) of actions" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                        {{action.text}}
                        <button type="button" class="btn btn-danger" v-on:click="actions.splice(index, 1)"><i class="fa fa-close"></i></button>
                      </li>
                    </ul>
                    <div class="text-center p-3" v-if="actions.length === 0">No actions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      rootPosition: 'top-right',
      toastTheme: 'default',
      toastTitle: 'My Toast Title',
      toastMessage: 'My toast message',
      toastPersist: false,
      toastManualDismiss: false,
      toastProgressBar: true,
      toastInterval: 2000,
      actionText: '',
      actions: []
    }
  },
  mounted() {

  },
  methods: {
    addAction() {
      this.actions.push({
        text: this.actionText,
        onClick: (e, toast) => {
          alert('You clicked a toast!');
        }
      })
    },
    changePosition() {
      let root = document.getElementById('sure-toast-root');

      if (root) {
        root.classList = '';
        root.classList.add(this.rootPosition);
      }
    },
    showToast() {
      this.$sureToast.show(this.toastMessage, {
        title: this.toastTitle,
        theme: this.toastTheme,
        persist: this.toastPersist,
        enableManualDismiss: this.toastManualDismiss,
        showProgressBar: this.toastProgressBar,
        interval: this.toastInterval,
        actions: this.actions
      });
    }
  }
}
</script>

<style>
  html, body {
    font-family: Verdana, Geneva, sans-serif;
    padding: 25px;
    font-size: 12px;
  }
  .poison {
    background-color: purple;
  }
</style>


