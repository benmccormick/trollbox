import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {App} from './modules/app/app.component';
import {store} from './setup/store';
import {getAllCards} from './actions/fetching/cards';

store.dispatch(getAllCards);

ReactDOM.render(<Provider store={store}>
        <App/>
    </Provider>, document.getElementById('container'));
