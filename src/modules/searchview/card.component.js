/* @flow */
import React from 'react';
import {cardContainer, cardName, cardLink} from './search.css';
import {Card} from '../../interfaces/trello';

type CVProps = {
    card: Card
};

export const CardView = (props: CVProps) => {
    let {name, shortUrl} = props.card;
    //TODO: Replace the onclick here with a real navigation function once I have internet :)
    return (<div className={cardContainer}>
        <span className={cardName}>{name}</span>
        <span onClick={()=> console.log(shortUrl)} className={cardLink}>Link</span>
    </div>);
};
