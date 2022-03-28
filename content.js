function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function addSharePointConfigFolioLink() {
        let attachmentsField = document.querySelector('label[title="Attachments\' location"] + span');

        if (attachmentsField) {        

            let attachmentLink = document.createElement("a");
            attachmentLink.href = attachmentsField.innerText;
            attachmentLink.innerText = "Go to SharePoint ⧉";

            attachmentLink.classList.add("aui-button", "aui-button-primary")

            attachmentsField.append(attachmentLink);
        }
        else {
            console.warn("No attachments field!")
        }    
}

function addSharePointViewFolioLink() {
    var xpath = "//span[text()=\"Attachments' location\"]";
    var attachmentsFieldLabel = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (attachmentsFieldLabel) {        
        let attachmentsField = attachmentsFieldLabel.nextSibling;
        let attachmentsParent = attachmentsField.parentElement;

        let attachmentLink = document.createElement("a");
        attachmentLink.href = attachmentsField.innerText;
        attachmentLink.innerText = "Go to SharePoint ⧉";

        attachmentLink.classList.add("aui-button", "aui-button-primary")

        attachmentsParent.after(attachmentLink);
    }
    else {
        console.warn("No attachments field!")
    }    
}

if (window.location.href.indexOf("ConfigureFolio.jspa") > -1) {
    waitForElm('#kt-config-fields-edit').then(() => {
        addSharePointConfigFolioLink();
    });
}

if (window.location.href.indexOf("/Folio.jspa") > -1) {
    waitForElm('#kt-folio-description-edit').then(() => {
        addSharePointViewFolioLink();
    });
}

