/* @flow */
import type { addViewAction } from '../interfaces/redux';
import type {View} from '../interfaces/view';

export const ADD_VIEW = 'ADD_VIEW';


export const addView = (view: View): addViewAction => ({
    type: ADD_VIEW,
    view,
});
