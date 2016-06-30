import React from 'react';
import {appShell} from './app.css';
import {BoardListContainer, content} from '../boardlist/boardlist.container';

export class App extends React.Component {
    render() {
        return (<div className={appShell}>
            <div className={content}>
                <BoardListContainer/>
            </div>
        </div>);
    }
};
