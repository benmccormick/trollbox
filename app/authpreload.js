//this file isn't in git, so you'll need to add it if you're working from a fresh clone
let trelloKey = require('./config/secrets').trelloKey;
let {ipcRenderer} = require('electron');
process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer;
    global.trelloKey = trelloKey;
    global.isHot = process.env.NODE_ENV === 'development';
});
