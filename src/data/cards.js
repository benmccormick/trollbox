import { UPDATE_CARDS } from '../actions/fetching/cards';
import {assign, get, sortBy} from 'lodash';

export const getAllCards = (state) => sortBy(get(state, 'data.cards'), 'id');

export const cards = (state = {}, action) => {
    let { type, cards: _cards } = action;
    switch (type) {
    case UPDATE_CARDS:
        return assign({}, state, _cards);
    default:
        return state;
    }
};
