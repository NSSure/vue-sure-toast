## Vue Sure Toast
Vue Sure Toast is a simple VueJS toast plugin.  This plugin contains built in features for theming, position, and more.  See below for a full list of features.

#### Installation

First import the plugin.

```javascript
import SureToast from './sure-toast';
```

Then configure the plugin with Vue.

```javascript
// The simplest implementation.
Vue.use(SureToast);

// You can set default option values for the plugin here.  See a full list of options below.
Vue.use(SureToast, options);
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

#### Options

Below is a full list of the available options for both the defaults and individual toasts.

| Option        | Type           | Values  | Default |
| ------------- |:-------------:| -----:| --------:|
| openDelay      | number | any number (milliseconds) | 5000ms  |
| enableManualDismiss      | boolean      |   true, false | false |
| position | string      |    'top-left', 'top-right', 'bottom-right', 'bottom-left', 'top', 'bottom' | 'top-right'  |
| theme | string | 'success', 'error', 'info', 'warning', 'default' | 'default' 

#### Inspiration/Credit

This plugin was inspired by [vue-toasted](https://github.com/shakee93/vue-toasted)

