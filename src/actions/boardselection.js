import {getAllCardsFromBoards} from './fetching/cards';

export const SELECT_BOARD = 'SELECT_BOARD';
export const DESELECT_BOARD = 'DESELECT_BOARD';

export const selectBoard = id => (dispatch, getState) => {
    dispatch({
        type: SELECT_BOARD,
        boardId: id,
    });
    //TODO: This is crazy inefficient long run.  Want to just get new stuff here
    // and smart schedule the remaining cards on some sort of scheduler/timer
    getAllCardsFromBoards(dispatch, getState);
};

export const deselectBoard = id => ({
    type: DESELECT_BOARD,
    boardId: id,
});
