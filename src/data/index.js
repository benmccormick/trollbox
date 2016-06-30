import { combineReducers } from 'redux';
import { cards } from './cards';
import { boards, selectedBoards } from './boards';

export default combineReducers({
    cards,
    boards,
    selectedBoards,
});
