/* @flow */
import type { changeSearchFilterAction, dispatchFn, getStateFn } from '../interfaces/redux';
import {debounce} from 'lodash';
import {getSearchFilter} from '../data/search.js';
import { getSelectedCards } from '../data/cards';
import { getCurrentUserId } from '../data/users';
import { find } from '../util/fuzzyfinder';

export const CHANGE_SEARCH_FILTER = 'CHANGE_SEARCH_FILTER';
export const UPDATE_RESULT_SET = 'UPDATE_RESULT_SET';

export const searchWithCurrentStateAndUpdate =
    debounce((state: any, filter: string, dispatch: dispatchFn) => {
        let cards = getSelectedCards(state);
        let currentUserId = getCurrentUserId(state);
        let results = find(cards, filter, currentUserId);
        dispatch({
            type: UPDATE_RESULT_SET,
            results,
        });
    }, 300);

export const updateResultSet = (dispatch: dispatchFn, getState: getStateFn) => {
    let state = getState();
    let filter = getSearchFilter(state);
    if (filter) {
        searchWithCurrentStateAndUpdate(state, filter, dispatch);
    } else {
        dispatch({
            type: UPDATE_RESULT_SET,
            results: [],
        });
    }
};

export const updateSearchFilter =
    (filter: string) => (dispatch: dispatchFn, getState: getStateFn): changeSearchFilterAction => {
        dispatch({
            type: CHANGE_SEARCH_FILTER,
            filter,
        });
        updateResultSet(dispatch, getState);
    };
