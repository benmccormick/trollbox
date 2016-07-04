import { combineReducers } from 'redux';
import { cards } from './cards';
import { view } from './view';
import { boards, selectedBoards } from './boards';

export default combineReducers({
    cards,
    boards,
    selectedBoards,
    view,
});
