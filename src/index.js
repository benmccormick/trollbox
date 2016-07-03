import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {App} from './modules/app/app.component';
import {store} from './setup/store';
import {getAllBoards} from './actions/fetching/boards';

store.dispatch(getAllBoards);

ReactDOM.render(<Provider store={store}>
        <App/>
    </Provider>, document.getElementById('container'));
