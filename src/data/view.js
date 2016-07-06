/* @flow */
import { CHANGE_VIEW, SEARCH_VIEW} from '../actions/view';
import type { actionType, viewOption } from '../interfaces/redux';


export const getView = (state: any ): viewOption => state.view;

export const view = (state : viewOption = SEARCH_VIEW, action: actionType): viewOption => {
    let { type, view: _view } = action;
    switch (type) {
    case CHANGE_VIEW:
        return _view;
    default:
        return state;
    }
};
