/* @flow */
import React from 'react';
import {boardSummary, boardTitle} from './boardlist.css';
import type {Board} from '../../interfaces/trello';

type BSProps = {
    board: Board,
    isSelected: boolean,
    toggleBoard: () => any,
};

export const BoardSummary = (props: BSProps) => {
    let {board, isSelected, toggleBoard} = props;
    let backgroundColor = isSelected ? board.prefs.backgroundColor || 'black' : 'grey';
    let style = {
        backgroundColor,
    };
    return (<div className={boardSummary} style={style} onClick={toggleBoard}>
        <h2 className={boardTitle}>{board.name}</h2>
    </div>);
};
