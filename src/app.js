import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

// TODO: look into switching to the "attach" plugin and running everything
// through a websocket connection instead of locally. This would make the
// backend server the single source of truth and reduce duplicate work.
// https://xtermjs.org/docs/api/addons/attach/

term.open(document.getElementById('terminal'));
term.writeln('Welcome to \x1B[1;36mAurora Empires\x1B[0m');
term.writeln('');

term.prompt = () => {
    term.write('\r\n> ');
};

prompt(term);

term.onKey(e => {
    const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

    if (e.domEvent.keyCode === 13) {
        prompt(term);
    } else if (e.domEvent.keyCode === 8) {
        // Do not delete the prompt
        if (term._core.buffer.x > 2) {
            term.write('\b \b');
        }
    } else if (printable) {
        term.write(e.key);
    }
});

function prompt(term) {
    term.write('\r\n> ');
}
