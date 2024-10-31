const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { startServer } = require('./server');

let mainWindow;

// Function to create the main window
async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Ensure this file is properly set up for context isolation
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: true, // Enable Node.js integration for plugins
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
        mainWindow.loadURL(`file://${path.join(__dirname, 'error.html')}`); // Optionally, load an error page
    }

    // Handle external links
    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url); // Open the URL in the default browser
    });

    // Clean up resources when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Initialize the application
app.on('ready', createWindow);

// Handle quitting the application
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Recreate the window on macOS when the dock icon is clicked
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});