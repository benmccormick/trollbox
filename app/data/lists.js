/* @flow */
import { UPDATE_LISTS } from '../actions/fetching/lists';
import {assign, get, sortBy} from 'lodash';
import type {List} from '../interfaces/trello';
import type { actionType, ListMap } from '../interfaces/redux';

export const getAllLists = (state : any): List[] => sortBy(get(state, 'lists'), 'id');
export const getListById = (state : any, listId: string): List => get(state, ['lists', listId]);


export const lists = (state : ListMap = {}, action: actionType) => {
    let { type, lists: _lists } = action;
    switch (type) {
    case UPDATE_LISTS:
        return assign({}, state, _lists);
    default:
        return state;
    }
};
