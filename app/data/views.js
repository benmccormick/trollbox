/* @flow */
import {assign, map, concat} from 'lodash';
import type {View} from '../interfaces/view';
import {ADD_VIEW, CHANGE_SELECTED_VIEW} from '../actions/views';
import type { actionType, ViewMap } from '../interfaces/redux';

type maybeString = ?string;

export const getCurrentView = (state: any): ?View =>
    (state.currentView && state.views[state.currentView]) ? state.views[state.currentView] : null;

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

export const currentView = (state : maybeString = null, action : actionType): maybeString => {
    let { type, view, id } = action;
    switch (type) {
    case ADD_VIEW:
        return view.id;
    case CHANGE_SELECTED_VIEW:
        return id;
    default:
        return state;
    }
};
