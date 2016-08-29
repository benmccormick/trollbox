/* @flow */
import { combineReducers } from 'redux';
import { cards } from './cards';
import { lists } from './lists';
import { boards } from './boards';
import { page } from './page';
import { views, viewsOrder, currentView } from './views';
import { users, currentUserId } from './users';
import { searchFilter, searchResults } from './search';

export default combineReducers({
    cards,
    users,
    currentUserId,
    boards,
    lists,
    searchResults,
    page,
    views,
    viewsOrder,
    currentView,
    searchFilter,
});
