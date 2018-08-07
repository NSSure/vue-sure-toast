const SureToastManager = function(defaultOptions) {
    var _toast = {
        pluginDefaultOptions: { 
            position: 'top-right', 
            openDelay: 0, 
            enableManualDismiss: false, 
            limit: 3, 
            theme: 'default', 
            persist: false,
            reverseToastOrder: false, 
            interval: 5000 
        },
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
    
                let actionContainer = createActionContainer(toast);

                if(options.action) {
                    actionContainer.appendChild(createAction(options.action));
                }
                else {
                    if(Array.isArray(options.actions)) {
                        options.actions.map((action) => {
                            actionContainer.appendChild(createAction(action));
                        });
                    }
                }

                toast.appendChild(actionContainer);
                var root = configureRootElement(options, toast);

                // This is false by default so new toasts are added at the top.
                if(options.reverseToastOrder) {
                    root.appendChild(toast);
                }
                else {
                    root.insertBefore(toast, root.firstChild);
                }

                if(typeof options.onOpened === "function") {
                    options.onOpened();
                }
                
                this.toasts.push(toast);
                this.toastsLoaded++;
    
                if(!options.persist) {
                    setTimeout(() => {
                        this.dismiss(toast);
                        
                        if(typeof options.onClosed === "function") {
                            options.onClosed();
                        }
                    }, options.interval);
                }
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

    function createAction(action) {
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

    function createActionContainer(toast) {
        let actionContainer = document.createElement("div");
        actionContainer.id = `action-container-${toast.id}`;
        actionContainer.classList.add("action-container");

        return actionContainer;
    }
    
    function createToast(options) {
        let toast = document.createElement("div");
    
        toast.classList.add('sure-toast');
        toast.style = '';
    
        if(options.enableManualDismiss) {
            toast.addEventListener('click', () => _toast.dismiss(toast));
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
        mapPluginLevelOnlyOptions(options);
        mapOptions(_toast.userDefaultOptions, _toast.pluginDefaultOptions);
        mapOptions(options, _toast.userDefaultOptions);

        return options;
    }

    function mapPluginLevelOnlyOptions(target) {
        target.position = _toast.userDefaultOptions.position || _toast.pluginDefaultOptions.position;
        target.limit = _toast.userDefaultOptions.limit || _toast.pluginDefaultOptions.limit;
        target.reverseToastOrder = _toast.userDefaultOptions.reverseToastOrder || _toast.pluginDefaultOptions.reverseToastOrder;
    }

    function mapOptions(target, source) {
        // map option properties.
        target.openDelay = target.openDelay || source.openDelay;
        target.enableManualDismiss = target.enableManualDismiss || source.enableManualDismiss;
        target.theme = target.theme || source.theme;
        target.interval = target.interval || source.interval;
        target.persist = target.persist || source.persist;

        // map option functions.
        target.onClosed = target.onClosed || source.onClosed;
        target.onOpened = target.onOpened || source.onOpened;
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