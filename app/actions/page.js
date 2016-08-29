/* @flow */
import type { changePageAction } from '../interfaces/redux';

export const CHANGE_PAGE = 'CHANGE_PAGE';

export const SEARCH_PAGE = 'SEARCH_PAGE';
export const VIEW_EDITOR_PAGE = 'VIEW_EDITOR_PAGE';

export const switchPageToSearch = (): changePageAction => ({
    type: CHANGE_PAGE,
    view: SEARCH_PAGE,
});

export const switchPageToViewEditor = (): changePageAction => ({
    type: CHANGE_PAGE,
    view: VIEW_EDITOR_PAGE,
});
