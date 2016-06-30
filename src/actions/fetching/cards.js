import {getTrelloClient} from '../../setup/trello_client';
import {cleanCardsFromAPI} from '../../util/api_cleaner';

export const UPDATE_CARDS = 'UPDATE_CARDS';

const getCardsFromClient = (dispatch, getState) => t => (t.get('member/me/cards').then(cards => {
    dispatch({
        type: UPDATE_CARDS,
        cards: cleanCardsFromAPI(cards),
    });
}));

export const getAllCards = (dispatch) => {
    getTrelloClient()
        .then(getCardsFromClient(dispatch))
        .catch(() => alert('failed to get trello client'));
};
