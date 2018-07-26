/*
API Options (Can be override from show call)
- openDelay = 0
- enableManualDismiss = true
- type (stretch, contained) = stretch
- position (top-left, top-right, bottom-right, bottom-left, top, bottom)
- colors []
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

function createContainer(options) {
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
    switch(theme) {
        case 'success':
            toast.classList.add('sure-toast-success');
            break;
        case 'error':
            toast.classList.add('sure-toast-error');
            break;
        default:
            break;
    }
}

const Popup = {
    install(Vue, defaultOptions) {
        Vue.prototype.$sureToast = {
            defaultOptions: defaultOptions,
            show(message, icon, options) {
                options = Object.assign(options, defaultOptions);

                this.dismiss();
        
                let toast = createContainer(options);
                
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

                document.body.appendChild(toast);
                setTimeout(() => this.dismiss(), options.interval);
            },
            dismiss() {
                let existingPopup = document.getElementById("sure-snippets-popup");
        
                if(existingPopup) {
                    existingPopup.remove();
                }
            }
        }
    }
}

export default Popup;
