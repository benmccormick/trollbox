/* @flow */
import {getTrelloClient} from '../../setup/trello_client';
import {cleanCardsFromAPI} from '../../util/api_cleaner';
import {map, flatten} from 'lodash';
import {getSourceBoards} from '../../data/boards';
import type {Card} from '../../interfaces/trello';
import type { dispatchFn, getStateFn } from '../../interfaces/redux';

export const UPDATE_CARDS = 'UPDATE_CARDS';

//return a promise of getting cards for a particular board
const getCardsFromBoard = (boardId: string, t: any): Card[] => t.get(`boards/${boardId}/cards`);

const updateCardsFromLists = (dispatch: dispatchFn) =>
    (cardsList: Card[]): void => dispatch({
        type: UPDATE_CARDS,
        cards: cleanCardsFromAPI(flatten(cardsList)),
    });

const getCardsFromEachBoard = (dispatch: dispatchFn, getState: getStateFn) => (t: any) => {
    let getBoardFromId = boardId => getCardsFromBoard(boardId, t);
    let selectedBoards = getSourceBoards(getState());
    let fetchPromises = map(selectedBoards, getBoardFromId);
    Promise.all(fetchPromises)
        .then(updateCardsFromLists(dispatch))
        .catch(() => {
            console.log('something went wrong fetching cards and it is really sad.');
        });
};

export const getAllCardsFromBoards = (dispatch: dispatchFn, getState: getStateFn) => {
    getTrelloClient().then(getCardsFromEachBoard(dispatch, getState));
};
