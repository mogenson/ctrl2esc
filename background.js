/*****************************************************************************
 * This Chrome OS extension will map the Escape key to a Control key if it's
 * used as a modifier with another key. So press and release Escape by itself
 * to emit an Escape key event. Hold Escape and press another key to emit a
 * Control + other key event. In the second case, the Escape down and up events
 * will not be sent.
 *****************************************************************************/

var contextID = 0;      // zero is supposed to send keys to non-input field
var savedEscKey = null; // save the escape key down event to send later

/* update the context when it changes */

chrome.input.ime.onFocus.addListener(function(context) {
    contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(function(context) {
    contextID = 0;
});

chrome.input.ime.onInputContextUpdate.addListener(function(context) {
    contextID = context.contextID;
});

/* handle keyboard input, return true to say we've modified this input */

chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
    //console.log('onKeyEvent', keyData); // DEBUGGING

    /* don't re-modify our own output */
    if (keyData.extensionId == chrome.runtime.id) return false;

    if (keyData.type == "keydown") {

        /* don't sent escape key, wait to see if it needs to be turned into a control key */
        if (keyData.code == "Escape" && !keyData.ctrlKey) {
            savedEscKey = keyData;
            return true;
        }

        /* if escape is held down, pass along any key inputs with the control key modifier set */
        if (savedEscKey) {
            savedEscKey.ctrlKey = true; // used to store ctrl key sent status
            keyData.ctrlKey = true;     // Chrome OS doesn't need a separate ctrl key event
            chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
            return true;
        }

    } else if (keyData.type == "keyup" && savedEscKey) {

        /* if we have an escape key down event that we've stored and possibly modified */
        if (keyData.code == "Escape") {
            if (!savedEscKey.ctrlKey) // no other keys were pressed, send escape keydown and keyup
                chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [savedEscKey, keyData]});

            /* otherwise escape was used as a ctrl modifier, discard the keyup and keydown events */
            savedEscKey = null; // clear saved keydown event
            return true;
        }

        /* pass along key inputs with the control key modifier set */
        if (savedEscKey.ctrlKey) {
            keyData.ctrlKey = true;
            chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
            return true;
        }
    }

    return false;
});
