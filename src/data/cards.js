/* @flow */
import { UPDATE_CARDS } from '../actions/fetching/cards';
import {assign, get, sortBy, clone, map, filter, includes} from 'lodash';
import { getSelectedBoards, getBoardById } from './boards';
import { getUserById } from './users';
import { getListById } from './lists';
import type {Card} from '../interfaces/trello';
import type { actionType, CardMap } from '../interfaces/redux';

export const getAllCards = (state : any): Card[] => sortBy(get(state, 'cards'), 'id');

const decorateCard = (state:any) => (card: Card): Card => {
    let cardCopy = clone(card);
    cardCopy.board = getBoardById(state, cardCopy.idBoard);
    cardCopy.list = getListById(state, cardCopy.idList);
    cardCopy.members = map(cardCopy.idMembers, memberId => getUserById(state, memberId));
    return cardCopy;
};

export const getSelectedCards = (state: any): Card[] => {
    let cards = getAllCards(state);
    let selectedBoards = getSelectedBoards(state);
    return map(filter(cards, card => includes(selectedBoards, card.idBoard)), decorateCard(state));
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
