const term = new Terminal();
const commandHistory = [];
let historyIndex = -1;
let commandBuffer = '';
let currentDir = '';

// Get user directory on load
window.onload = function () {
    fetch('/user-home-dir')
        .then(response => response.json())
        .then(data => {
            currentDir = data.homeDir;
            term.write(`${currentDir} $ `);
        });
};

async function executeCommand(command) {
    try {
        const response = await fetch('/execute-command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command, currentDir })
        });
        const result = await response.json();
        currentDir = result.currentDir || currentDir;
        term.write(`\r\n${result.output}`);
        term.write(`\r\n${currentDir} $ `);
    } catch (error) {
        console.error('Command execution error:', error);
        term.write(`\r\nError: ${error.message}\r\n${currentDir} $ `);
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
term.write(`${currentDir} $ `);

term.onData(data => {
    if (data === '\r') { // Enter key
        if (commandBuffer.trim()) {
            commandHistory.push(commandBuffer.trim());
            historyIndex = commandHistory.length;
            executeCommand(commandBuffer.trim());
            commandBuffer = '';
        }
    } else if (data === '\u007F') { // Backspace
        if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            term.write('\b \b');
        }
    } else if (data === '\x1B[A' || data === '\x1B[B') { // Arrow navigation
        handleArrowNavigation(data);
    } else {
        commandBuffer += data;
        term.write(data);
    }
});