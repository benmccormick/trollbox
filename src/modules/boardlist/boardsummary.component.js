import React from 'react';
import {boardSummary, boardTitle} from './boardlist.css';

export const BoardSummary = ({board, isSelected, toggleBoard}) => {
    let backgroundColor = isSelected ? board.prefs.backgroundColor || 'black' : 'grey';
    let style = {
        backgroundColor,
    };
    return (<div className={boardSummary} style={style} onClick={toggleBoard}>
        <h2 className={boardTitle}>{board.name}</h2>
        <a href={board.shortUrl}>🔗</a>
    </div>);
};

BoardSummary.propTypes = {
    board: React.PropTypes.object.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    toggleBoard: React.PropTypes.func.isRequired,
};
