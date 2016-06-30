
export const SELECT_BOARD = 'SELECT_BOARD';
export const DESELECT_BOARD = 'DESELECT_BOARD';

export const selectBoard = id => ({
    type: SELECT_BOARD,
    boardId: id,
});

export const deselectBoard = id => ({
    type: DESELECT_BOARD,
    boardId: id,
});
