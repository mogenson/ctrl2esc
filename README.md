# ctrl2esc

Like [caps2esc](https://github.com/oblitum/caps2esc), but for Chrome OS.

I started with [dstarikov/esc2ctrl](https://github.com/dstarikov/esc2ctrl)
which was cloned from
[mogenson/esc2ctrl](https://github.com/mogenson/esc2ctrl). My version is much
simpler because I realized I only needed to watch for taps on the
<kbd>Control</kbd> key. I had problems with the upstream versions hanging the
control key in the down position. This one can't do that.

## Description

It is my factual opinion that the best keyboard mapping is to have the
<kbd>Search</kbd> key (<kbd>Caps</kbd> on a normal keyboard) send an
<kbd>Esc</kbd> key event when pressed by itself and a <kbd>Ctrl</kbd> key event
when used a modifier with another key. Try this out when using Vim or Tmux and
thank me later.

The `caps2esc` utility for Linux does this perfectly. `ctrl2esc` is my attempt
to mimic this behavior on Chrome OS. It creates an <kbd>Esc</kbd> key event
when the <kbd>Ctrl</kbd> key is pressed by itself and otherwise leaves things
alone. This works best when mapping the <kbd>🔍</kbd> key and <kbd>Caps</kbd>
to <kbd>Ctrl</kbd> in the Chrome OS keyboard settings.

## Usage

1. Set _Caps Lock_ and _Search_ to _Control_ in Settings->Device->Keyboard
2. Enable the _Developer mode_ switch in the top right of `chrome://extensions`
3. Press the _Load unpacked_ button and select the `ctrl2esc` folder
4. Press _Input method_ -> _Manage input methods_ and select `ctrl2esc` in `chrome://settings/languages`
5. Enable _Show input options in the shelf_
6. Select `EN ctrl2exc` in the Chrome OS shelf, near the notifications

## Caveats

The Chrome [input method
editor](https://developer.chrome.com/extensions/input_ime) system only provides
a valid context for text field entries. `ctrl2esc` will work for apps that are
text fields like the [Secure
Shell](https://chrome.google.com/webstore/detail/secure-shell-app/pnhechapfaindjhompbnflcldabbghjo?hl=en)
app and the [hterm](https://hterm.org/) based Crostini Terminal app.
