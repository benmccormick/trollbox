/* @flow */
import type { addViewAction, changeSelectedViewAction, dispatchFn, getStateFn }
    from '../interfaces/redux';
import {updateResultSet} from './search';
import type {View} from '../interfaces/view';
import uuid from 'uuid';

export const ADD_VIEW = 'ADD_VIEW';
export const CHANGE_SELECTED_VIEW = 'CHANGE_SELECTED_VIEW';

export const changeSelectedView = (viewId: string): changeSelectedViewAction =>
    (dispatch: dispatchFn, getState: getStateFn) => {
        dispatch({
            type: CHANGE_SELECTED_VIEW,
            id: viewId,
        });
        updateResultSet(dispatch, getState);
    };

// Add a new view (assigns a new uuid)
export const addView = (view: View): addViewAction => {
    view.id = uuid.v1();
    return {
        type: ADD_VIEW,
        view,
    };
};
