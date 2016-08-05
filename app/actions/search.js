/* @flow */
import type { changeSearchFilterAction, dispatchFn, getStateFn } from '../interfaces/redux';
import {debounce} from 'lodash';
import {getSearchFilter} from '../data/search.js';
import { getSelectedCards } from '../data/cards';
import { find } from '../util/fuzzyfinder';

export const CHANGE_SEARCH_FILTER = 'CHANGE_SEARCH_FILTER';
export const UPDATE_RESULT_SET = 'UPDATE_RESULT_SET';

export const searchWithCurrentState = debounce((state: any, filter: string) => {
    let cards = getSelectedCards(state);
    return find(cards, filter);
}, 300);

export const updateResultSet = (dispatch: dispatchFn, getState: getStateFn) => {
    let state = getState();
    let filter = getSearchFilter(state);
    let results = filter ? searchWithCurrentState(state, filter) : [];
    dispatch({
        type: UPDATE_RESULT_SET,
        results,
    });
};

export const updateSearchFilter =
    (filter: string) => (dispatch: dispatchFn, getState: getStateFn): changeSearchFilterAction => {
        dispatch({
            type: CHANGE_SEARCH_FILTER,
            filter,
        });
        updateResultSet(dispatch, getState);
    };
