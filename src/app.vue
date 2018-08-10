<template>
  <div id="app">
    <label class="demo-title">Vue Sure Toast Demo</label>
    <p class="demo-detail">Displaying the built in themed toasts using the default plugin options.</p>

    <div class="plugin-configuration">
      <p class="demo-details"><strong>Plugin Configuration</strong></p>

      <select v-model="rootPosition" v-on:change="changePosition()">
        <option v-for="position of $sureToast.positions" :key="position">{{position}}</option>
      </select>

      <button type="button" v-on:click="showToast()">Show Toast</button>
      <button type="button" v-on:click="$sureToast.dismissAll()">Clear All</button>
    </div>
    <div class="toast-configuration">
      <p class="demo-detail"><strong>Toast Configuration</strong></p>

      <p class="demo-details">Toast Title</p>
      <input type="text" v-model="toastTitle" placeholder="Title" />

      <p class="demo-details">Toast Message</p>
      <input type="text" v-model="toastMessage" placeholder="Message" />

      <p class="demo-details">Toast Theme</p>
      <select v-model="toastTheme">
        <option v-for="theme of $sureToast.themes" :key="theme">{{theme}}</option>
      </select>

      <p class="demo-details">Persist Toast</p>
      <input type="checkbox" id="checkbox" v-model="toastPersist">

      <p class="demo-details">Manual Dimiss</p>
      <input type="checkbox" id="checkbox" v-model="toastManualDismiss">

      <p class="demo-details">Progress Bar</p>
      <input type="checkbox" id="checkbox" v-model="toastProgressBar">

      <p class="demo-details">Toast Interval (ms)</p>
      <input type="text" v-model="toastInterval" placeholder="Title" />

      <p class="demo-details">Actions</p>
      
      <input type="text" v-model="actionText" placeholder="Action Title" /><br><br>

      <button type="button" v-on:click="addAction()">Add Action</button>
      <button type="button" v-on:click="actions = []">Clear All</button>
      <ul>
        <li v-for="(action, index) of actions" :key="index">
          {{action.text}}
          <button type="button" v-on:click="actions.splice(index, 1)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
      root.classList = '';
      root.classList.add(this.rootPosition);
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
    width: 50%;
    margin: 0 auto;
  }

  .demo-title {
    font-size: 2rem;
  }

  .demo-detail {
    font-size: 1.25rem;
  }
</style>


