/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {AppContainer} from './modules/app/app.container';
import {store} from './setup/store';
import {initializeUserData} from './setup/data';

initializeUserData(store);

ReactDOM.render(<Provider store={store}>
        <AppContainer/>
    </Provider>, document.getElementById('container'));
