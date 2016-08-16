const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

const createWindow = isDevelopment => {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, '/../app/indexpreload.js'),
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/../app/index.html');

    // Open the DevTools.
    if (isDevelopment) {
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    return mainWindow;
};

module.exports = createWindow;
