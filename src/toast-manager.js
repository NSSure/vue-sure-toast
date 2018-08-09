const SureToastManager = function(defaultOptions) {
    var _toast = {
        positions: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'bottom', 'top-flush', 'bottom-flush'],
        themes: ['default', 'success', 'warning', 'error', 'info'],
        pluginDefaultOptions: { 
            position: 'top-right', 
            openDelay: 0, 
            enableManualDismiss: false, 
            limit: 3, 
            theme: 'default', 
            persist: false,
            reverseToastOrder: false, 
            interval: 5000,
            title: null
        },
        userDefaultOptions: defaultOptions || {},
        toastsLoaded: 0,
        toasts: [],

        show: function(message, icon, options) {
            options = setDefaultOptions(options);
    
            if(this.toastsLoaded < options.limit) {
                let toast = createToast(message, icon, options);

                if(typeof options.onOpened === "function") {
                    options.onOpened();
                }
                
                this.toasts.push(toast);
                this.toastsLoaded++;

                var root = configureRootElement(options, toast);

                if(options.enableManualDismiss) {
                    toast.addEventListener('click', () => _toast.dismiss(toast));
                }

                // This is false by default so new toasts are added at the top.
                if(options.reverseToastOrder) {
                    root.appendChild(toast);
                }
                else {
                    root.insertBefore(toast, root.firstChild);
                }
    
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

    function createToast(message, icon, options) {
        var id = buildToastId();
    
        let toast = document.createElement("div");
    
        toast.classList.add('sure-toast');
        toast.style = '';
        toast.id = id;
    
        applyTheme(toast, options.theme);

        toast.appendChild(createToastContent(message, icon, options));

        if(options.action || (options.actions && Array.isArray(options.actions) && options.actions.length > 0)) {
            toast.appendChild(createToastActions(options));
        }

        return toast;
    }

    function createToastContent(message, icon, options) {
        let toastContent = document.createElement("div");
        toastContent.classList.add('sure-toast-content');

        if(options.title) {
            toastContent.appendChild(createToastTitle(options.title));
        }

        toastContent.appendChild(createToastMessage(message, icon));

        return toastContent;
    }

    function createToastTitle(title) {
        let titleContainer = document.createElement("div");
        titleContainer.classList.add('sure-toast-header');

        let titleText = document.createElement("label");
        titleText.classList.add('sure-toast-title');
        
        titleText.innerText = title;

        titleContainer.appendChild(titleText);

        return titleContainer
    }

    function createToastMessage(message, icon) {
        let messageContainer = document.createElement("div");
        messageContainer.classList.add("sure-toast-message");

        let messageBody = document.createElement('span');

        messageBody.innerHTML = `<i class="toast-icon ${icon}"></i> ${message}`;

        messageContainer.appendChild(messageBody);

        return messageContainer;
    }

    function createToastActions(options) {
        let actionContainer = createActionContainer();

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

        return actionContainer;
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

    function createActionContainer() {
        let actionContainer = document.createElement("div");
        actionContainer.classList.add("action-container");

        return actionContainer;
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

    function buildToastId() {
        return `sure-toast-${Math.floor((Math.random() * 10000) + 1)}`;
    }

    return _toast;
}

export default SureToastManager;