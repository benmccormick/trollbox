const electron = require('electron');
const getMenuTemplate = require('./server/menu_template');
const createWindow = require('./server/main_window');
require('./server/auth_window');

// Modules to control application life and menu
const {app, Menu} = electron;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Checking to see whether we're in dev or prod mode
let isDevelopment = process.env.NODE_ENV === 'development';


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
        mainWindow = createWindow(isDevelopment);
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    mainWindow = createWindow(isDevelopment);
    let menuTemplate = getMenuTemplate(app);
    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});
