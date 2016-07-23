/* @flow */
import React from 'react';
import {cardContainer, cardName, cardHeader, cardBody} from './search.css';
import type {Card} from '../../interfaces/trello';
let {shell} = require('electron');

type CVProps = {
    card: Card
};

export const CardView = (props: CVProps) => {
    let {name, shortUrl, board, list} = props.card;
    let {prefs: {
        backgroundColor
    }, name: boardName} = board;
    let { name: listName } = list;
    //TODO: Replace the onclick here with a real navigation function once I have internet :)
    return (<div className={cardContainer} onClick={()=> shell.openExternal(shortUrl)} >
        <div className={cardHeader} style={{backgroundColor}}>
            <span>{boardName} - {listName}</span>
        </div>
        <div className={cardBody}>
            <span className={cardName}>{name}</span>
        </div>
    </div>);
};
