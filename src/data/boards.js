import { UPDATE_BOARDS } from '../actions/fetching/boards';
import {assign, get, sortBy, without, union, includes, map} from 'lodash';
import {SELECT_BOARD, DESELECT_BOARD} from '../actions/boardselection';

const byMostRecent = board => {
    let {dateLastView} = board;
    if (!dateLastView) {
        return Math.NEGATIVE_INFINITY;
    }
    return 0 - Date.parse(dateLastView);
};

const getBoards = state => get(state, 'data.boards');

const getSelected = state => get(state, 'data.selectedBoards');

const getSortedBoards = state => sortBy(getBoards(state), byMostRecent);

const isSelected = (state, board) => includes(getSelected(state), board.id);

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
