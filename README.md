## Vue Sure Toast
Vue Sure Toast is a simple VueJS toast plugin.  This plugin contains built in features for theming, position, and more.  See below for a full list of features.

#### Samples

Here are the basic themes built into the plugin.

![Alt text](docs/images/toast-samples.PNG?raw=true "Toast Samples")

Toast with the progress bar enabled (choppiness is just the gif).

![Alt text](docs/gifs/progress-sample.gif?raw=true "Toast progress bar sample")

#### Installation

First import the plugin.

```javascript
import SureToast from 'vue-sure-toast';
```

Then configure the plugin with Vue.

```javascript
// The simplest implementation.
Vue.use(SureToast);

// You can set default option values for the plugin here.  See a full list of options below.
Vue.use(SureToast, options);

// Here is a sample that sets the position and theme for all the toasts.
Vue.use(SureToast, {
  position: 'top-left',
  theme: 'warning'
});
```

#### Basic Usage

Displaying a toast message from within a component.

```javascript
// The simplest method for displaying toast.
this.$sureToast.show(message);

this.$sureToast.show(message, icon);

this.$sureToast.show(message, icon, options);
```

The options parameter can contain an action that will be appended to the toast an a link.

```javascript
this.$sureToast.show('I am a toast message', 'fa fa-info-circle', {
  interval: 5000,
  enableManualDismiss: true,
  action: { 
    text: 'DISMISS', 
    onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
  }
});
```

You can also pass an array of actions when displaying a toast.  If you pass both the 'action' and 'actions' property
the 'action' property will take precedence over 'actions'.  Make sure you pass one to save yourself some trouble.

```javascript
this.$sureToast.show('I am a toast message', 'fa fa-info-circle', {
  interval: 5000,
  enableManualDismiss: true,
  actions: [
    { 
      text: 'OPEN', 
      onClick: (e, toast) => { alert('OPEN CLICKED: ' + toast); } 
    },
    { 
      text: 'DISMISS', 
      onClick: (e, toast) => { alert('CLOSE CLICKED: ' + toast); } 
    }
  ]
});
```

#### Toast Hooks

There are to methods you can hook into that will get fired when a toast is opened or closed.

```javascript
// If you want a fire onOpened or onClosed for a specific toast you can do it like so.
this.$sureToast.show('I am a toast message', 'fa fa-info-circle', {
  interval: 5000,
  onOpened(e) {
    console.log('toast opened');
  },
  onClosed(e) {
    console.log('toast closed');
  }
});
```

If you want to fire the onOpened and onClosed for all the toasts you can pass define your functions in the plugin options.

```javascript
Vue.use(SureToast, {
  onOpened() {
    console.log('toast opened');
  },
  onClosed() {
    console.log('toast closed');
  }
});
```

Any plugin level options that are passed through the show function will be ignored by the plugin.

#### Plugin/Toast Options

Below is a full list of the available options for both the defaults and individual toasts.

| Option        | Type           | Values  | Default | Description |
| ------------- |:-------------:| -----:| --------:|----------------:|
| interval | number | any number (milliseconds) | 5000ms  | The duration the toast is visible |
| enableManualDismiss      | boolean      |   true, false | false | Allows toasts to be manually dismissed |
| position | string      |    'top-left', 'top-right', 'bottom-right', 'bottom-left', 'top', 'bottom' | 'top-right'  | Screen position of the toast |
| theme | string | 'success', 'error', 'info', 'warning', 'default' | 'default'  | The color scheme of the toast |
| limit | number | any whole number | 3  | How many toasts can be displayed at once |
| persist | boolean | true, false | false  | Forces toasts to remain on screen (overrides interval) |
| reverseToastOrder | boolean | true, false | false  | If true displays the latest toasts at the bottom |
| showProgressBar | boolean | true, false | false  | If true displays the a progress bar across the bottom of toast with displaying the remaining time left for the toast |
| onOpened | function | N/A | undefined  | Executed after a toast is opened |
| onClosed | function | N/A | undefined  | Executed after a toast is closed |

#### Plugin ONLY Options

Below is a full list of the options that can only be set at the plugin level (passed to the Vue.use function).

| Option        | Type           | Values  | Default | Description |
| ------------- |:-------------:| -----:| --------:|----------------:|
| position | string      |    'top-left', 'top-right', 'bottom-right', 'bottom-left', 'top', 'bottom' | 'top-right'  | Screen position of the toast |
| limit | number | any whole number | 3  | How many toasts can be displayed at once |
| reverseToastOrder | boolean | true, false | false  | If true displays the latest toasts at the bottom |

#### Methods

Below is a full list of the methods available through the Vue instance.

| Method        | Parameters           | Description  |
| ------------- |:-------------:| -----:|
| show      | message, icon, options | Display a toast with the default options |
| showSuccess      | message, icon, options | Displays a success toast (sets theme to 'success') |
| showError      | message, icon, options | Displays an error toast (sets theme to 'error') | 
| showWarning      | message, icon, options | Displays a warning toast (sets theme to 'warning') |
| showInfo      | message, icon, options | Display an information toast (sets theme to 'info') | 
| dismiss      | toast | Removes a given toast from the DOM (NOT WORKING) | 
| dismissAll      | N/A | Removes all toasts from the DOM | 

#### Properties

Below is a full list of properties availble through the Vue instance.

| Property        | Type           | Description  |
| ------------- |:-------------:| -----:|
| pluginDefaultOptions      | object | Stores the defaults for the plugin.  This is used as a fallback if no plugin or toast level settings are set by the user |
| userDefaultOptions      | object | Stores the default options configured at the plugin level by the user |
| toastsLoaded      | number | Stores the current number of toasts visible on the DOM | 
| toasts      | array | Stores an array of DOM elements that represents the toasts current visible on the DOM |

#### Inspiration/Credit

This plugin was inspired by [vue-toasted](https://github.com/shakee93/vue-toasted)

#### Development

Developed by: NSSure

