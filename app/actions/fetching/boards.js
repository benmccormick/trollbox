/* @flow */
import {getTrelloClient} from '../../setup/trello_client';
import {cleanBoardsFromAPI} from '../../util/api_cleaner';
import type {Board} from '../../interfaces/trello';
import type { dispatchFn, getStateFn } from '../../interfaces/redux';

export const UPDATE_BOARDS = 'UPDATE_BOARDS';

const getBoardsFromClient = (dispatch: dispatchFn, getState: getStateFn) => t => (
    t.get('member/me/boards').then((boards: Board[]) => {
        dispatch({
            type: UPDATE_BOARDS,
            boards: cleanBoardsFromAPI(boards),
        });
    })
);

export const getAllBoards = (dispatch: dispatchFn) => {
    getTrelloClient()
        .then(getBoardsFromClient(dispatch))
        .catch((e) => console.log(e));
};
