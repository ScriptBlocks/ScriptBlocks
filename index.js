const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { start, startServer } = require('./server');

let mainWindow;

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: true, // Ensure Node.js integration is enabled
        }
    });

    // Load the loading page first
    mainWindow.loadURL(`file://${path.join(__dirname, 'loading.html')}`);

    try {
        const { server, port } = await startServer();
        // Load the main page once the server is started
        mainWindow.loadURL(`http://localhost:${port}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }

    // Handle external links
    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url); // Open the URL in the default browser
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
