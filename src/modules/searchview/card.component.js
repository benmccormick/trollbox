/* @flow */
import React from 'react';
import {cardContainer, cardName} from './search.css';
import type {Card} from '../../interfaces/trello';
let {shell} = require('electron');

type CVProps = {
    card: Card
};

export const CardView = (props: CVProps) => {
    let {name, shortUrl} = props.card;
    //TODO: Replace the onclick here with a real navigation function once I have internet :)
    return (<div className={cardContainer} onClick={()=> shell.openExternal(shortUrl)} >
        <span className={cardName}>{name}</span>
    </div>);
};
