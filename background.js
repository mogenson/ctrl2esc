var contextID = 0; // 0 sends keys to non-input field
var savedEscKey = null;
var ctrlKeySent = false;

chrome.input.ime.onFocus.addListener(function(context) {
    contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(function(context) {
    contextID = 0;
});

chrome.input.ime.onInputContextUpdate.addListener(function(context) {
    contextID = context.contextID;
});

chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
    var handled = false; // return true to say we've modified this input

    /* don't re-modify our own output */
    if (keyData.extensionId == chrome.runtime.id) return handled;

    /* DEBUGGING */
    //console.log('onKeyEvent', keyData);

    if (keyData.type == "keydown") {
        if (keyData.code == "Escape") {
            /* don't sent escape key
             * wait for another key to see if it needs to be turned
             * into a control key */
            savedEscKey = keyData;
            handled = true;
        } else if (savedEscKey) {
            /* if escape is held down, pass along any key inputs with the
             * control key modifier set */
            keyData.ctrlKey = true;
            ctrlKeySent = true;
            chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
            handled = true;
        }
    } else if (keyData.type == "keyup") {
        if (keyData.code == "Escape") {
            if (ctrlKeySent) {
                /* escape was used as a control modifier
                 * swallow the escape keyup and keydown */
                savedEscKey = null;
                ctrlKeySent = false;
                handled = true;
            } else {
                /* no other keys were pressed, send escape keydown and keyup */
                chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [savedEscKey, keyData]});
                savedEscKey = null;
                handled = true;
            }
        } else if (ctrlKeySent) {
            /* pass along key inputs with the control key modifier set */
            keyData.ctrlKey = true;
            chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
            handled = true;
        }
    }

    return handled;
});
