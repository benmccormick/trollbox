import {getTrelloClient} from '../../setup/trello_client';
import {cleanBoardsFromAPI} from '../../util/api_cleaner';

export const UPDATE_BOARDS = 'UPDATE_BOARDS';

const getBoardsFromClient = (dispatch, getState) => t => (t.get('member/me/boards').then(boards => {
    dispatch({
        type: UPDATE_BOARDS,
        boards: cleanBoardsFromAPI(boards),
    });
}));

export const getAllBoards = (dispatch) => {
    getTrelloClient()
        .then(getBoardsFromClient(dispatch))
        .catch((e) => console.log(e));
};
