/* @flow */
import type { changeViewAction } from '../interfaces/redux';

export const CHANGE_VIEW = 'CHANGE_VIEW';

export const SEARCH_VIEW = 'SEARCH_VIEW';
export const VIEW_EDITOR_VIEW = 'VIEW_EDITOR_VIEW';

export const switchViewToSearch = (): changeViewAction => ({
    type: CHANGE_VIEW,
    view: SEARCH_VIEW,
});
export const switchViewToViewEditor = (): changeViewAction => ({
    type: CHANGE_VIEW,
    view: VIEW_EDITOR_VIEW,
});
