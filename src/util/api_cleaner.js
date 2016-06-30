import {map, cloneDeep, keyBy} from 'lodash';

//no cleaning for now, just cloning
const cleanCardFromAPI = card => cloneDeep(card);
const cleanBoardFromAPI = board => cloneDeep(board);

export const cleanCardsFromAPI = cards => keyBy(map(cards, cleanCardFromAPI), 'id');

export const cleanBoardsFromAPI = boards => keyBy(map(boards, cleanBoardFromAPI), 'id');
