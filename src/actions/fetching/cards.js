import {getTrelloClient} from '../../setup/trello_client';
import {cleanCardsFromAPI} from '../../util/api_cleaner';
import {map, flatten} from 'lodash';
import {getSelectedBoards} from '../../data/boards';

export const UPDATE_CARDS = 'UPDATE_CARDS';

//return a promise of getting cards for a particular board
const getCardsFromBoard = (boardId, t) => t.get(`boards/${boardId}/cards`);

const updateCardsFromLists = dispatch => cardsList => dispatch({
    type: UPDATE_CARDS,
    cards: cleanCardsFromAPI(flatten(cardsList)),
});

const getCardsFromEachBoard = (dispatch, getState) => t => {
    let getBoardFromId = boardId => getCardsFromBoard(boardId, t);
    let selectedBoards = getSelectedBoards(getState());
    let fetchPromises = map(selectedBoards, getBoardFromId);
    Promise.all(fetchPromises)
        .then(updateCardsFromLists(dispatch))
        .catch(() => {
            console.log('something went wrong fetching cards and it is really sad.');
        });
};

export const getAllCardsFromBoards = (dispatch, getState) => {
    getTrelloClient().then(getCardsFromEachBoard(dispatch, getState));
};


// const getCardsFromClient = (dispatch, getState) => t => (t.get('member/me/cards').then(cards => {
//     dispatch({
//         type: UPDATE_CARDS,
//         cards: cleanCardsFromAPI(cards),
//     });
// }));
//
// export const getAllCards = (dispatch) => {
//     getTrelloClient()
//         .then(getCardsFromClient(dispatch))
//         .catch(() => alert('failed to get trello client'));
// };
