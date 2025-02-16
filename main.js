const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // --- ONLY CHANGE BELOW ---
  if (app.isPackaged) {
    // In production, load the local index.html from /out
    mainWindow.loadFile(path.join(__dirname, 'out', 'index.html'));
  } else {
    // In development, load localhost:3000
    mainWindow.loadURL('http://localhost:3000');
  }
  // --- ONLY CHANGE ABOVE ---

  // mainWindow.webContents.openDevTools(); // optional, for debugging
}

// Example function to create a note window
function createNoteWindow() {
  const noteWindow = new BrowserWindow({
    width: 250,
    height: 250,
    minWidth: 250,
    maxWidth: 250,
    resizable: true,
    frame: false,
    transparent: false,
    hasShadow: false, // Disable shadow if it's causing the extra black area
    backgroundColor: '#FFFBBD',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  // --- ONLY CHANGE BELOW ---
  if (app.isPackaged) {
    // In production, load /note/index.html from /out/note
    // (Make sure "note" route actually exports to /out/note/index.html)
    noteWindow.loadFile(path.join(__dirname, 'out', 'note', 'index.html'));
  } else {
    // In development, load localhost:3000/note
    noteWindow.loadURL('http://localhost:3000/note');
  }
  // --- ONLY CHANGE ABOVE ---
}

app.whenReady().then(createMainWindow);

// IPC: when renderer requests a new note
ipcMain.handle('create-note', () => {
  console.log('Main process received create-note');
  createNoteWindow();
});
