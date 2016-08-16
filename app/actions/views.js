/* @flow */
import type { addViewAction } from '../interfaces/redux';
import type {View} from '../interfaces/view';
import uuid from 'uuid';

export const ADD_VIEW = 'ADD_VIEW';


// Add a new view (assigns a new uuid)
export const addView = (view: View): addViewAction => {
    view.id = uuid.v1();
    return {
        type: ADD_VIEW,
        view,
    };
};
