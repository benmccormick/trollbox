import { CHANGE_SEARCH_FILTER } from '../actions/search';
import { getSelectedCards } from './cards';
import { find } from '../util/fuzzyfinder';

export const getSearchFilter = state => state.searchFilter;
export const getSearchResults = state => {
    let filter = getSearchFilter(state);
    let cards = getSelectedCards(state);
    return filter ? find(cards, filter) : [];
};

export const searchFilter = (state = '', action) => {
    let { type, filter } = action;
    switch (type) {
    case CHANGE_SEARCH_FILTER:
        return filter;
    default:
        return state;
    }
};
