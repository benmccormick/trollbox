/* @flow */
import { UPDATE_BOARDS } from '../actions/fetching/boards';
import {assign, get, sortBy, without, union, includes, map, filter} from 'lodash';
import {SELECT_BOARD, DESELECT_BOARD} from '../actions/boardselection';
import type {Board} from '../interfaces/trello';
import type { actionType, boardMap } from '../interfaces/redux';

export const getSelectedBoards = (state: any): string[] => get(state, 'selectedBoards');

const byMostRecent = (board: Board): number => {
    let {dateLastView} = board;
    if (!dateLastView) {
        return Number.NEGATIVE_INFINITY;
    }
    return 0 - Date.parse(dateLastView);
};

const getOpenBoards = (state: any): Board[] => filter(get(state, 'boards', []), b => !b.closed);

const getSortedBoards = (state: any): Board[] => sortBy(getOpenBoards(state), byMostRecent);

const isSelected = (state: any, board: Board): boolean =>
    includes(getSelectedBoards(state), board.id);

const updateBoard = (state: any) => (board: Board): Board =>
    assign(board, {isSelected: isSelected(state, board)});

export const getAllBoards = (state: any): Board[] =>
    map(getSortedBoards(state), updateBoard(state));

export const getBoardById = (state: any, id: string): ?Board => get(state, ['boards', id], null);

export const boards = (state : boardMap = {}, action: actionType): boardMap => {
    let { type, boards: _boards } = action;
    switch (type) {
    case UPDATE_BOARDS:
        return assign({}, state, _boards);
    default:
        return state;
    }
};

export const selectedBoards = (state : string[] = [], action: actionType): string[] => {
    let { type, boardId} = action;
    switch (type) {
    case SELECT_BOARD:
        return union(state, [boardId]);
    case DESELECT_BOARD:
        return without(state, boardId);
    default:
        return state;
    }
};
