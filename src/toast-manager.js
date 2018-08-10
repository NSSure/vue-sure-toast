const SureToastManager = function(defaultOptions) {
    var _toast = {
        positions: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'bottom', 'top-flush', 'bottom-flush'],
        themes: ['default', 'success', 'warning', 'error', 'info'],
        pluginDefaultOptions: { 
            position: 'top-right', 
            enableManualDismiss: false, 
            limit: 3, 
            theme: 'default', 
            persist: false,
            reverseToastOrder: false, 
            interval: 5000,
            title: null,
            showProgressBar: true
        },
        userDefaultOptions: defaultOptions || {},
        toastsLoaded: 0,
        toasts: [],

        show: function(message, options) {
            options = setDefaultOptions(options);
    
            if(this.toastsLoaded < options.limit) {
                let toast = createToast(message, options);

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
                    if(options.showProgressBar) {
                        let progressBarIdSuffix = generateRandomId();
                        var progressBarId = `progress-bar-${progressBarIdSuffix}`;
            
                        let progressBar = createProgressBar();
                        progressBar.id = progressBarId;

                        progressBar.style = `animation: collapse ${options.interval / 1000}s; animation-timing-function: linear;`;
            
                        toast.appendChild(progressBar);
                    }

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
    
        showSuccess: function(message, options) {
            options.theme = "success";
            this.show(message, options);
        },
    
        showError: function(message, options) {
            options.theme = "error";
            this.show(message, options);
        },
    
        showInfo: function(message, options) {
            options.theme = "info";
            this.show(message, options);
        },
    
        showWarning: function(message, options) {
            options.theme = "warning";
            this.show(message, options);
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

    function createToast(message, options) {
        let toastIdSuffix = generateRandomId();
        let toastId = `sure-toast-${toastIdSuffix}`;
    
        let toast = document.createElement("div");
    
        toast.classList.add('sure-toast');
        toast.style = '';
        toast.id = toastId;
    
        applyTheme(toast, options.theme);

        toast.appendChild(createToastContent(message, options));

        if(options.action || (options.actions && Array.isArray(options.actions) && options.actions.length > 0)) {
            toast.appendChild(createToastActions(options));
        }

        return toast;
    }

    function createToastContent(message, options) {
        let toastContent = document.createElement("div");
        toastContent.classList.add('sure-toast-content');

        if(options.title) {
            toastContent.appendChild(createToastTitle(options.title));
        }

        toastContent.appendChild(createToastMessage(message));

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

    function createToastMessage(message) {
        let messageContainer = document.createElement("div");
        messageContainer.classList.add("sure-toast-message");

        let messageBody = document.createElement('span');

        messageBody.innerHTML = `${message}`;

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

        anchor.innerHTML += action.text;
        anchor.addEventListener('click', action.onClick);
    
        return anchor;
    }

    function createActionContainer() {
        let actionContainer = document.createElement("div");
        actionContainer.classList.add("action-container");

        return actionContainer;
    }

    function createProgressBar(id) {
        let progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');

        let bar = document.createElement('div');
        bar.classList.add('bar');

        progressBar.appendChild(bar);

        return progressBar;
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
        // TODO: Fix this mess.

        // map option properties.
        target.enableManualDismiss = target.enableManualDismiss !== undefined ? target.enableManualDismiss : source.enableManualDismiss;
        target.showProgressBar = target.showProgressBar !== undefined ? target.showProgressBar : source.showProgressBar;
        target.theme = target.theme !== undefined ? target.theme : source.theme;
        target.interval = target.interval !== undefined ? target.interval : source.interval;
        target.persist = target.persist !== undefined ? target.persist : source.persist;

        // map option functions.
        target.onClosed = target.onClosed !== undefined ? target.onClosed : source.onClosed
        target.onOpened = target.onOpened !== undefined ? target.onOpened : source.onOpened
    }

    function generateRandomId() {
        return Math.floor((Math.random() * 10000) + 1);
    }

    return _toast;
}

export default SureToastManager;