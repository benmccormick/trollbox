import React from 'react';
import {cardContainer, cardName, cardLink} from './search.css';

export const CardView = ({card}) => {
    let {name, shortUrl} = card;
    //TODO: Replace the onclick here with a real navigation function once I have internet :)
    return (<div className={cardContainer}>
        <span className={cardName}>{name}</span>
        <span onClick={()=> console.log(shortUrl)} className={cardLink}>Link</span>
    </div>);
};

CardView.propTypes = {
    card: React.PropTypes.object.isRequired,
};
