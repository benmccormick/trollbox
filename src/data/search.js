import { CHANGE_SEARCH_FILTER } from '../actions/search';

export const getSearchFilter = state => state.searchFilter;
export const getSearchResults = () => {
    return [];
}

export const searchFilter = (state = '', action) => {
    let { type, filter } = action;
    switch (type) {
    case CHANGE_SEARCH_FILTER:
        return filter;
    default:
        return state;
    }
};
