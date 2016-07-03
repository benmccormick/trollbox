import { UPDATE_BOARDS } from '../actions/fetching/boards';
import {assign, get, sortBy, without, union, includes, map, filter} from 'lodash';
import {SELECT_BOARD, DESELECT_BOARD} from '../actions/boardselection';

export const getSelectedBoards = state => get(state, 'data.selectedBoards');

const byMostRecent = board => {
    let {dateLastView} = board;
    if (!dateLastView) {
        return Math.NEGATIVE_INFINITY;
    }
    return 0 - Date.parse(dateLastView);
};

const getOpenBoards = state => filter(get(state, 'data.boards', []), b => !b.closed);

const getSortedBoards = state => sortBy(getOpenBoards(state), byMostRecent);

const isSelected = (state, board) => includes(getSelectedBoards(state), board.id);

const updateBoard = state => board => assign(board, {isSelected: isSelected(state, board)});

export const getAllBoards = state => map(getSortedBoards(state), updateBoard(state));

export const boards = (state = {}, action) => {
    let { type, boards: _boards } = action;
    switch (type) {
    case UPDATE_BOARDS:
        return assign({}, state, _boards);
    default:
        return state;
    }
};

export const selectedBoards = (state = [], action) => {
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
