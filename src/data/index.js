/* @flow */
import { combineReducers } from 'redux';
import { cards } from './cards';
import { lists } from './lists';
import { boards, selectedBoards } from './boards';
import { view } from './view';
import { searchFilter } from './search';

export default combineReducers({
    cards,
    boards,
    lists,
    selectedBoards,
    view,
    searchFilter,
});
