import React from 'react';
import {appShell, leftBar, content} from './app.css';
import {CardListContainer} from '../cardlist/cardlist.container';

export class App extends React.Component {
    render() {
        return (<div className={appShell}>
            <div className={leftBar}/>
            <div className={content}>
                <CardListContainer/>
            </div>
        </div>);
    }
};
