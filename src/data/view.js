import { CHANGE_VIEW, SEARCH_VIEW } from '../actions/view';

export const getView = (state) => state.view;

export const view = (state = SEARCH_VIEW, action) => {
    let { type, view: _view } = action;
    switch (type) {
    case CHANGE_VIEW:
        return _view;
    default:
        return state;
    }
};
