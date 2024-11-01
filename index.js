const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { startServer } = require('./server');

let mainWindow;

function loadPlugins() {
    const pluginsDir = path.join(__dirname, 'plugins');
    const plugins = []; // Array to hold loaded plugins

    fs.readdirSync(pluginsDir).forEach(file => {
        if (file.endsWith('.js')) {
            const pluginPath = path.join(pluginsDir, file);
            const plugin = require(pluginPath);
            plugins.push(plugin); // Store the plugin for server hooks
        }
    });

    return plugins; // Return loaded plugins
}

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL(`file://${path.join(__dirname, 'loading.html')}`);

    try {
        const plugins = loadPlugins(); // Load plugins
        const { port } = await startServer(plugins); // Pass plugins to the server
        mainWindow.loadURL(`http://localhost:${port}`);
    } catch (error) {
        console.error('Error starting server:', error);
        mainWindow.loadURL(`file://${path.join(__dirname, 'error.html')}`);
    }

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
