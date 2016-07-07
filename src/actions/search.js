/* @flow */
import type { changeSearchFilterAction } from '../interfaces/redux';

export const CHANGE_SEARCH_FILTER = 'CHANGE_SEARCH_FILTER';

export const updateSearchFilter = (filter: string): changeSearchFilterAction => ({
    type: CHANGE_SEARCH_FILTER,
    filter,
});
