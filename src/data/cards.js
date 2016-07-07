/* @flow */
import { UPDATE_CARDS } from '../actions/fetching/cards';
import {assign, get, sortBy} from 'lodash';
import { getSelectedBoards } from './boards';
import { filter, includes } from 'lodash';
import type {Card} from '../interfaces/trello';
import type { actionType, CardMap } from '../interfaces/redux';

export const getAllCards = (state : any): Card[] => sortBy(get(state, 'cards'), 'id');


export const getSelectedCards = (state: any): Card[] => {
    let cards = getAllCards(state);
    let selectedBoards = getSelectedBoards(state);
    return filter(cards, card => includes(selectedBoards, card.idBoard));
};

export const cards = (state : CardMap = {}, action: actionType) => {
    let { type, cards: _cards } = action;
    switch (type) {
    case UPDATE_CARDS:
        return assign({}, state, _cards);
    default:
        return state;
    }
};
