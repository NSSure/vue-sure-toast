## Vue Sure Toast
Vue Sure Toast is a simple VueJS toast plugin.  This plugin contains built in features for theming, position, and more.  See below for a full list of features.

#### Installation

First import the plugin.

```javascript
import SureToast from './vue-sure-toast';
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
})
```

#### Basic Usage

Displaying a toast message from within a component.

```javascript
// The simplest method for displaying toast.
this.$sureToast(message);

this.$sureToast(message, icon);

this.$sureToast(message, icon, options);
```

The options parameter can contain an action that will be appended to the toast an a link.

```javascript
this.$sureToast.show('Settings updated successfully', 'fa fa-info-circle', {
  interval: 5000,
  enableManualDismiss: true,
  action: { 
    text: 'DISMISS', 
    onClick: (e, toast) => { alert('TOAST CLICKED: ' + toast); } 
  }
});
```

Any plugin level options that are passed through the show function will be ignored by the plugin.

#### Options

Below is a full list of the available options for both the defaults and individual toasts.

| Option        | Type           | Values  | Default |
| ------------- |:-------------:| -----:| --------:|
| openDelay      | number | any number (milliseconds) | 5000ms  |
| enableManualDismiss      | boolean      |   true, false | false |
| position | string      |    'top-left', 'top-right', 'bottom-right', 'bottom-left', 'top', 'bottom' | 'top-right'  |
| theme | string | 'success', 'error', 'info', 'warning', 'default' | 'default' 

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

