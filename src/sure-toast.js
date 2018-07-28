/*
API Options (Can be override from show call)
- openDelay = 0
- enableManualDismiss = true
- position (top-left, top-right, bottom-right, bottom-left, top, bottom)
- limit = 0
*/

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
        toast.addEventListener('click', () => this.dismiss());
    }

    applyTheme(toast, options.theme);

    return toast;
}

function applyTheme(toast, theme) {
    toast.classList.add(theme);
}

function applyPosition(root, position) {
    root.classList.add(position);
}

function setDefaultOptions(options, defaultOptions) {
    options.openDelay = options.openDelay || 0;
    options.enableManualDismiss = options.enableManualDismiss || false;
    options.position = options.position || 'top-right';

    //options = Object.assign(options, defaultOptions);

    return options;
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

const Popup = {
    install(Vue, defaultOptions) {
        Vue.prototype.$sureToast = {
            defaultOptions: defaultOptions,
            toastsLoaded: 0,
            toasts: [],
            show(message, icon, options) {
                options = setDefaultOptions(options, defaultOptions);

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

                    var root = configureRootElement(options);
                    root.appendChild(toast);

                    this.toasts.push(toast);
                    this.toastsLoaded++;

                    setTimeout(() => this.dismiss(toast), options.interval);
                }
                else {
                    // Toast limit reached.
                }
            },
            dismiss(toast) {
                if(toast) {
                    toast.remove();
                    this.toastsLoaded--;
                }
            },
            dismissAll() {
                this.toasts.forEach((toast) => {
                    toast.remove();
                    this.toastsLoaded--;
                });
            }
        }
    }
}

export default Popup;
