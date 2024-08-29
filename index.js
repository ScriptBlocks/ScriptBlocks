const { app, BrowserWindow } = require('electron');
const path = require('path');
// const { setupTitlebar, attachTitlebarToWindow, TitlebarColor } = require('custom-electron-titlebar/main');
const { start, startServer } = require('./server'); // Import the start function from server.js

let mainWindow;

async function createWindow() {
    // Set up the custom titlebar with options
    // setupTitlebar({
    //     icon: path.join(__dirname, 'icons', 'icon.png'), // Path to the app icon
    //     iconSize: 20, // Size of the icon
    //     titleHorizontalAlignment: 'left', // Title aligned to the left
    //     order: 'first-buttons', // Keep buttons in their default order
    //     minimizable: true,
    //     maximizable: true,
    //     closeable: true,
    //     tooltips: {
    //         minimize: 'Minimize',
    //         maximize: 'Maximize',
    //         restoreDown: 'Restore Down',
    //         close: 'Close'
    //     }
    // });

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    // Attach the custom titlebar to the window
    // attachTitlebarToWindow(mainWindow);

    // Load the loading page first
    mainWindow.loadURL(`file://${path.join(__dirname, 'loading.html')}`);

    try {
        const { server, port } = await startServer();
        // Load the main page once the server is started
        mainWindow.loadURL(`http://localhost:${port}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
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