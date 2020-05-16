# ctrl2esc
Like [caps2esc](https://github.com/oblitum/caps2esc), but for Chrome OS. I'm simply renaming dstarikov's esc2ctrl to correspond to what it actually does.

## Description
It is my factual opinion that the best keyboard mapping is to have the <kbd>Caps</kbd> key send an <kbd>Esc</kbd> key event when pressed by itself and a <kbd>Ctrl</kbd> key event when used a modifier with another key. Try this out when using Vim or Tmux and thank me later.

The `caps2esc` utility for Linux does this perfectly. `ctrl2esc` is my attempt to mimic this behavior on Chrome OS. It passes along an <kbd>Esc</kbd> key event when the <kbd>Ctrl</kbd> key is pressed by itself or a <kbd>Ctrl</kbd> key event when it is used as a modifier with another key. This works best when mapping the <kbd>🔍</kbd> key to <kbd>Ctrl</kbd> in the Chrome OS keyboard settings.

## Usage
1. Set *Caps Lock* or *Search* to *Control* in `chrome://settings/keyboard-overlay`
2. Enable the *Developer mode* switch in the top right of `chrome://extensions`
3. Press the *Load unpacked* button and select the `ctrl2esc` folder
4. Press *Input method* -> *Manage input methods* and select `ctrl2esc` in `chrome://settings/languages`
5. Enable *Show input options in the shelf*
6. Select `EN ctrl2exc` in the Chrome OS shelf, near the notifications

## Caveats
The Chrome [input method editor](https://developer.chrome.com/extensions/input_ime) system only provides a valid context for text field entries. `ctrl2esc` will work for apps that are text fields like the [Secure Shell](https://chrome.google.com/webstore/detail/secure-shell-app/pnhechapfaindjhompbnflcldabbghjo?hl=en) app and the [hterm](https://hterm.org/) based Crostini Terminal app.
