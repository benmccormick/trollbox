/* @flow */
import Trello from 'troll-client';
const {ipcRenderer} = require('electron');

const useToken = (token: string, trelloClient: any, resolve: any) => {
    trelloClient.setToken(token);
    resolve(trelloClient);
};

const getToken = (trelloClient: any, resolve: any) => {
    ipcRenderer.send('get-token');
    ipcRenderer.on('set-token', (event, token) => {
        localStorage.setItem('trelloToken', token);
        useToken(token, trelloClient, resolve);
    });
};

export const getTrelloClient = () => {
    return new Promise((resolve, reject) => {
        let t = new Trello(window.trelloKey);
        let token = localStorage.getItem('trelloToken');
        if (token) {
            useToken(token, t, resolve);
        } else {
            getToken(t, resolve);
        }

    });
};
