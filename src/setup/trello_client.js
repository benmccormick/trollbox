/* @flow */
import Trello from 'troll-client';
const {ipcRenderer} = require('electron');

export const getTrelloClient = () => {
    return new Promise((resolve, reject) => {
        let t = new Trello(window.trelloKey);
        ipcRenderer.send('get-token');
        ipcRenderer.on('set-token', (event, token) => {
            t.setToken(token);
            resolve(t);
        });

    });
};
