/*****************************************************************************
 * This Chrome OS extension will emit an Escape key tap when the Control key is
 * tapped without pressing any other keys. So press and release Control key by
 * itself to emit an Escape key event.
 ******************************************************************************/

var contextID = 0; // zero is supposed to send keys to non-input field
var ctrlTap = false; // true when control is pressed alone

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
    // console.log('onKeyEvent', keyData); // DEBUGGING

    /* don't re-modify our own output */
    if (keyData.extensionId == chrome.runtime.id) return false;

    if (keyData.type == "keydown") {
        if (keyData.code == "ControlLeft") {
            ctrlTap = true;
        } else {
            ctrlTap = false;
        }
    } else if (
        keyData.type == "keyup" &&
        keyData.code == "ControlLeft" &&
        ctrlTap
    ) {
        // clone the keyData since I don't know what all is needed
        var escDown = Object.assign({}, keyData, {
            code: "Escape",
            key: "Esc",
            type: "keydown",
            ctrlKey: false
        });
        var escUp = Object.assign({}, escDown, { type: "keyup" });
        // send the ctrl up, escape down, escape up
        chrome.input.ime.sendKeyEvents({
            contextID: contextID,
            keyData: [keyData, escDown, escUp]
        });
        ctrlTap = false;
        return true;
    }
    return false;
});
