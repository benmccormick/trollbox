/* @flow */
import { UPDATE_BOARDS } from '../actions/fetching/boards';
import {assign, get, sortBy, union, includes, map, filter} from 'lodash';
import type {Board} from '../interfaces/trello';
import type { actionType, BoardMap } from '../interfaces/redux';

export const getSourceBoards = (state: any): string[] => {
    let viewsObject = get(state, 'views');
    let sourcesByView = map(viewsObject, view => view.sources.boards);
    return union(...sourcesByView);
};

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
    includes(getSourceBoards(state), board.id);

const updateBoard = (state: any) => (board: Board): Board =>
    assign(board, {isSelected: isSelected(state, board)});

export const getAllBoards = (state: any): Board[] =>
    map(getSortedBoards(state), updateBoard(state));

export const getBoardById = (state: any, id: string): ?Board => get(state, ['boards', id], null);

export const boards = (state : BoardMap = {}, action: actionType): BoardMap => {
    let { type, boards: _boards } = action;
    switch (type) {
    case UPDATE_BOARDS:
        return assign({}, state, _boards);
    default:
        return state;
    }
};
