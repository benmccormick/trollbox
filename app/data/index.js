/* @flow */
import { combineReducers } from 'redux';
import { cards } from './cards';
import { lists } from './lists';
import { boards, selectedBoards } from './boards';
import { view } from './view';
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
    selectedBoards,
    view,
    views,
    viewsOrder,
    currentView,
    searchFilter,
});
