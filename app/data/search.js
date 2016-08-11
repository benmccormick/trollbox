/* @flow */
import { CHANGE_SEARCH_FILTER, UPDATE_RESULT_SET } from '../actions/search';
import { map, extend } from 'lodash';
import {getCardById} from './cards';
import type { ResultSet, Result } from '../util/fuzzyfinder';
import type { actionType} from '../interfaces/redux';

export const getSearchFilter = (state: any): string => state.searchFilter;

export const getSearchResults = (state: any): ResultSet => {
    return map(state.searchResults, (result: Result): Result => {
        return extend({}, result, {
            card: getCardById(state, result.cardId),
        });
    });
};

export const searchResults = (state : ResultSet = [], action: actionType) => {
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
