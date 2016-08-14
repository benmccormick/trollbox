/* @flow */
import {assign, map, concat} from 'lodash';
import type {View} from '../interfaces/view';
import {ADD_VIEW} from '../actions/views';
import type { actionType, ViewMap } from '../interfaces/redux';


export const getAllViews = (state: any): View[] => map(state.views);


export const views = (state : ViewMap = {}, action: actionType): ViewMap => {
    let { type, view } = action;
    switch (type) {
    case ADD_VIEW:
        return assign({}, state, {
            [view.id]: view,
        });
    default:
        return state;
    }
};

export const viewsOrder = (state : string[] = [], action: actionType): string[] => {
    let { type, view } = action;
    switch (type) {
    case ADD_VIEW:
        return concat(state, [view.id]);
    default:
        return state;
    }
};
