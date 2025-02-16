const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // call create-note in the main process
  createNote: () => ipcRenderer.invoke('create-note'),
});
