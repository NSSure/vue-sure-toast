/*
API Options (Can be override from show call)
- openDelay = 0
- enableManualDismiss = true
- position (top-left, top-right, bottom-right, bottom-left, top, bottom)
- limit = 0
*/
import SureToastComponent from './vue-sure-toast.vue';

const SureToastUtil = {
    toastsLoaded = 0,
    toasts = [],

    show = (message, icon, options) => {
        options = this.setDefaultOptions(options);

        if(this.toastsLoaded < options.limit) {
            var id = this.buildToastId();

            let toast = this.createToast(options);
            toast.id = id;
        
            let messageBody = document.createElement('span');
            messageBody.innerHTML = `<i class="toast-icon ${icon}"></i> ${message}`;

            toast.appendChild(messageBody);

            if(options.action) {
                let actionContainer = document.createElement("div");
                actionContainer.classList.add("action-container");
                
                let action = this.parseAction(options.action);
                actionContainer.appendChild(action);

                toast.appendChild(actionContainer);
            }

            var root = this.configureRootElement(options);
            root.appendChild(toast);

            this.toasts.push(toast);
            this.toastsLoaded++;

            setTimeout(() => this.dismiss(toast), options.interval);
        }
        else {
            // Toast limit reached.
        }
    },

    dismiss = (toast) => {
        if(toast) {
            toast.remove();
            this.toastsLoaded--;
        }
    },

    dismissAll = () => {
        this.toasts.forEach((toast) => {
            toast.remove();
            this.toastsLoaded--;
        });
    },

    parseAction = (action) => {
        let anchor = document.createElement("a");
    
        anchor.classList.add('toast-action');
        anchor.setAttribute('href', '#');
    
        if(action.icon) {
            anchor.innerHTML += `<i class="${action.icon}"></i>`;
        }
        
        anchor.innerHTML += action.text;
        anchor.addEventListener('click', action.onClick);
    
        return anchor;
    },
    
    createToast = (options) => {
        let toast = document.createElement("div");
    
        toast.classList.add('sure-toast');
        toast.style = '';
    
        if(options.enableManualDismiss) {
            toast.addEventListener('click', () => this.dismiss());
        }
    
        this.applyTheme(toast, options.theme);
    
        return toast;
    },
    
    applyTheme = (toast, theme) => {
        toast.classList.add(theme);
    },
    
    applyPosition = (root, position) => {
        root.className = "";
        root.classList.add(position);
    },
    
    setDefaultOptions = (options) => {
        options.openDelay = options.openDelay || 0;
        options.enableManualDismiss = options.enableManualDismiss || false;
        options.position = options.position || 'top-right';
        options.limit = options.limit || 3;
    
        //options = Object.assign(options, defaultOptions);
    
        return options;
    },
    
    configureRootElement = (options) => {
        var root = document.getElementById('sure-toast-root');
    
        if(!root) {
            root = document.createElement("div");
            root.id = "sure-toast-root";
    
            document.body.appendChild(root);
        }
    
        this.applyPosition(root, options.position);
    
        return root;
    },
    
    buildToastId = () => {
        return `sure-toast-${Math.floor((Math.random() * 10000) + 1)}`;
    }
}

const SureToast = {
    install(Vue) {
        Vue.component('SureToastComponent', SureToastComponent);
	    Vue.prototype.$sureToast = SureToastUtil;
    }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SureToast)
}

export default SureToast;