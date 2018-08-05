const SureToastManager = function(defaultOptions) {
    var _toast = {
        pluginDefaultOptions: { position: 'top-right', openDelay: 0, enableManualDismiss: false, limit: 3, theme: 'default', interval: 5000 },
        userDefaultOptions: defaultOptions || {},
        toastsLoaded: 0,
        toasts: [],

        show: function(message, icon, options) {
            options = setDefaultOptions(options);
    
            if(this.toastsLoaded < options.limit) {
                var id = buildToastId();
    
                let toast = createToast(options);
                toast.id = id;
        
                let messageBody = document.createElement('span');
                messageBody.innerHTML = `<i class="toast-icon ${icon}"></i> ${message}`;
    
                toast.appendChild(messageBody);
    
                if(options.action) {
                    let actionContainer = document.createElement("div");
                    actionContainer.classList.add("action-container");
                    
                    let action = parseAction(options.action);
                    actionContainer.appendChild(action);
    
                    toast.appendChild(actionContainer);
                }
    
                var root = configureRootElement(options, toast);
                root.appendChild(toast);
    
                this.toasts.push(toast);
                this.toastsLoaded++;
    
                setTimeout(() => this.dismiss(toast), options.interval);
            }
            else {
                // Toast limit reached.
            }
        },
    
        showSuccess: function(message, icon, options) {
            options.theme = "success";
            this.show(message, icon, options);
        },
    
        showError: function(message, icon, options) {
            options.theme = "error";
            this.show(message, icon, options);
        },
    
        showInfo: function(message, icon, options) {
            options.theme = "info";
            this.show(message, icon, options);
        },
    
        showWarning: function(message, icon, options) {
            options.theme = "warning";
            this.show(message, icon, options);
        },
    
        dismiss: function(toast) {
            if(toast) {
                toast.remove();
                _toast.toastsLoaded--;
            }
        },
    
        dismissAll: function() {
            this.toasts.forEach((toast) => {
                toast.remove();
                _toast.toastsLoaded--;
            });
        }
    }

    function fire() {
        alert('fire');
    }

    // Abstraction functions only used in the toast manager.  The user has no access to these through the plugin.
    function parseAction(action) {
        let anchor = document.createElement("a");
    
        anchor.classList.add('toast-action');
        anchor.setAttribute('href', '#');
    
        if(action.icon) {
            anchor.innerHTML += `<i class="${action.icon}"></i>`;
        }
        
        anchor.innerHTML += action.text;
        anchor.addEventListener('click', action.onClick);
    
        return anchor;
    }
    
    function createToast(options) {
        let toast = document.createElement("div");
    
        toast.classList.add('sure-toast');
        toast.style = '';
    
        if(options.enableManualDismiss) {
            toast.addEventListener('click', () => _toast.dismiss());
        }
    
        applyTheme(toast, options.theme);
    
        return toast;
    }
    
    function applyTheme(toast, theme) {
        toast.classList.add(theme);
    }
    
    function applyPosition(root, position) {
        root.className = "";
        root.classList.add(position);
    }
    
    function setDefaultOptions(options) {
        mapOptions(_toast.userDefaultOptions, _toast.pluginDefaultOptions);
        mapOptions(options, _toast.userDefaultOptions);

        return options;
    }

    function mapOptions(target, source) {
        target.openDelay = target.openDelay || source.openDelay;
        target.enableManualDismiss = target.enableManualDismiss || source.enableManualDismiss;
        target.position = target.position || source.position;
        target.limit = target.limit || source.limit;
        target.theme = target.theme || source.theme;
        target.interval = target.interval || source.interval;
    }
    
    function configureRootElement(options) {
        var root = document.getElementById('sure-toast-root');
    
        if(!root) {
            root = document.createElement("div");
            root.id = "sure-toast-root";
    
            document.body.appendChild(root);
        }

        applyPosition(root, options.position);
    
        return root;
    }
    
    function buildToastId() {
        return `sure-toast-${Math.floor((Math.random() * 10000) + 1)}`;
    }

    return _toast;
}

export default SureToastManager;