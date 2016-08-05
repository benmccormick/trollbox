/* @flow */
import { combineReducers } from 'redux';
import { cards } from './cards';
import { lists } from './lists';
import { boards, selectedBoards } from './boards';
import { view } from './view';
import { users } from './users';
import { searchFilter, searchResults } from './search';

export default combineReducers({
    cards,
    users,
    boards,
    lists,
    searchResults,
    selectedBoards,
    view,
    searchFilter,
});
