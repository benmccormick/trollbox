import Trello from 'troll-client';

let t = new Trello(window.trelloKey, { });
t.authorize({
  type: 'popup',
  name: 'TrollBox',
  scope: {
    read: true,
    write: true
  },
  expiration: 'never',
}).then(() => {
    window.ipcRenderer.send('set-token', t.token());
});
