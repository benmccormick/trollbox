const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const {ipcMain} = electron;

// Keep a global reference of the window object, if you don't, the window will
let authWindow;

const createAuthWindow = () => {
    // Create the browser window.
    authWindow = new BrowserWindow({
        width: 10,
        height: 10,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, '/../app/authpreload.js'),
        }
    });

    // and load the index.html of the app.
    authWindow.loadURL('file://' + __dirname + '/../app/auth.html');

    // Emitted when the window is closed.
    authWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        authWindow = null;
    });

    return authWindow;
};

let sendTokenBack = () => null;
ipcMain.on('get-token', (event, token) => {
    createAuthWindow();
    sendTokenBack = t => event.sender.send('set-token', t);
});

ipcMain.on('set-token', (event, token) => {
    authWindow.close();
    //send along to the main process
    sendTokenBack(token);
});
