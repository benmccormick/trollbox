/* @flow */
import { CHANGE_SEARCH_FILTER, UPDATE_RESULT_SET } from '../actions/search';
import type { ResultSet } from '../util/fuzzyfinder';
import type { actionType} from '../interfaces/redux';
import type { Card } from '../interfaces/trello';

export const getSearchFilter = (state: any): string => state.searchFilter;

export const getSearchResults = (state: any): ResultSet => {
    return state.searchResults;
};

export const searchResults = (state : Card[] = [], action: actionType) => {
    let { type, results } = action;
    switch (type) {
    case UPDATE_RESULT_SET:
        return results;
    default:
        return state;
    }
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
