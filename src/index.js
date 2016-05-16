import React from 'react';
import ReactDOM from 'react-dom';
import {Hello} from './test';
import Trello from 'troll-client';
const {ipcRenderer} = require('electron');

ReactDOM.render(<Hello/>, document.getElementById('container'))

let t = new Trello(window.trelloKey);

ipcRenderer.send('get-token');
ipcRenderer.on('set-token', (event, token) => {
    t.setToken(token);
    t.get('members/me').then((data) => console.log(data));
})
