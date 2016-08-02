const electron = require('electron');
const path = require('path');
// Module to control application life.
const {app, ipcMain} = electron;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, authWindow;
let isDevelopment = process.env.NODE_ENV === 'development';


const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, '/app/indexpreload.js'),
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

const createAuthWindow = () => {
    // Create the browser window.
    authWindow = new BrowserWindow({
        width: 10,
        height: 10,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, '/app/authpreload.js'),
        }
    });

    // and load the index.html of the app.
    authWindow.loadURL('file://' + __dirname + '/auth.html');

    // Emitted when the window is closed.
    authWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        authWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

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
