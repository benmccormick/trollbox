import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {AppContainer} from './modules/app/app.container';
import {store} from './setup/store';
import {getAllBoards} from './actions/fetching/boards';

store.dispatch(getAllBoards);

ReactDOM.render(<Provider store={store}>
        <AppContainer/>
    </Provider>, document.getElementById('container'));
