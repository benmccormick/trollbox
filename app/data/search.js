/* @flow */
import { CHANGE_SEARCH_FILTER } from '../actions/search';
import { getSelectedCards } from './cards';
import { find } from '../util/fuzzyfinder';
import type { ResultSet } from '../util/fuzzyfinder';
import type { actionType} from '../interfaces/redux';

export const getSearchFilter = (state: any): string => state.searchFilter;
export const getSearchResults = (state: any): ResultSet => {
    let filter = getSearchFilter(state);
    let cards = getSelectedCards(state);
    return filter ? find(cards, filter) : [];
};

export const searchFilter = (state : string = '', action: actionType) => {
    let { type, filter } = action;
    switch (type) {
    case CHANGE_SEARCH_FILTER:
        return filter;
    default:
        return state;
    }
};
