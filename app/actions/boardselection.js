/* @flow */
import type { toggleBoardAction, actionType } from '../interfaces/redux';
import {getAllUserData} from '../setup/data';

export const SELECT_BOARD = 'SELECT_BOARD';
export const DESELECT_BOARD = 'DESELECT_BOARD';

export const selectBoard = (id: string) =>
    (dispatch: (x:actionType) => void, getState: () => any ): void => {
        dispatch({
            type: SELECT_BOARD,
            boardId: id,
        });
        //TODO: This is crazy inefficient long run.  Want to just get new stuff here
        // and smart schedule the remaining cards on some sort of scheduler/timer
        getAllUserData(dispatch, getState);
    };

export const deselectBoard = (id: string): toggleBoardAction => ({
    type: DESELECT_BOARD,
    boardId: id,
});
