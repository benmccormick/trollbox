export const CHANGE_SEARCH_FILTER = 'CHANGE_SEARCH_FILTER';

export const updateSearchFilter = filter => ({
    type: CHANGE_SEARCH_FILTER,
    filter,
});
