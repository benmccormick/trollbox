//this file isn't in git, so you'll need to add it if you're working from a fresh clone
let trelloKey = require('../config/secrets').trelloKey;
process.once('loaded', () => {
    global.trelloKey = trelloKey;
});
