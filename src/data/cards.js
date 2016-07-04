import { UPDATE_CARDS } from '../actions/fetching/cards';
import {assign, get, sortBy} from 'lodash';
import { getSelectedBoards } from './boards';
import { filter, includes } from 'lodash';

export const getAllCards = state => sortBy(get(state, 'cards'), 'id');

export const getSelectedCards = state => {
    let cards = getAllCards(state);
    let selectedBoards = getSelectedBoards(state);
    return filter(cards, card => includes(selectedBoards, card.idBoard));
};

export const cards = (state = {}, action) => {
    let { type, cards: _cards } = action;
    switch (type) {
    case UPDATE_CARDS:
        return assign({}, state, _cards);
    default:
        return state;
    }
};
