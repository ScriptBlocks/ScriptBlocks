const term = new Terminal();
const commandHistory = [];
let historyIndex = -1;
let commandBuffer = '';

async function executeCommand(command) {
    try {
        const response = await fetch('/execute-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        });
        const result = await response.json();
        term.write(`\r\n${result.output}$ `);
    } catch (error) {
        console.error('Command execution error:', error);
        term.write(`\r\nError: ${error.message}\r\n$ `);
    }
}

function handleArrowNavigation(key) {
    if (key === '\x1B[A') { // Up arrow
        if (historyIndex > 0) historyIndex--;
    } else if (key === '\x1B[B') { // Down arrow
        if (historyIndex < commandHistory.length - 1) historyIndex++;
        else historyIndex = commandHistory.length;
    }

    term.write('\x1B[2K\r$ ');
    term.write(commandHistory[historyIndex] || '');
    commandBuffer = commandHistory[historyIndex] || '';
}

term.open(document.getElementById('terminal'));
term.write('$ ');

term.onData(data => {
    if (data === '\r') {
        if (commandBuffer.trim()) {
            commandHistory.push(commandBuffer.trim());
            historyIndex = commandHistory.length;
            executeCommand(commandBuffer.trim());
            commandBuffer = '';
        }
        term.write('\r\n$ ');
    } else if (data === '\u007F') {
        if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            term.write('\b \b');
        }
    } else if (data === '\x1B[A' || data === '\x1B[B') {
        handleArrowNavigation(data);
    } else {
        commandBuffer += data;
        term.write(data);
    }
});
