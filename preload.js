const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC methods
contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    close: () => ipcRenderer.send('close')
});
