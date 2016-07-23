/* @flow */
import {map, cloneDeep, keyBy} from 'lodash';
import type {Card, Board, List} from '../interfaces/trello';

//no cleaning for now, just cloning
const cleanCardFromAPI = (card:Card):Card => cloneDeep(card);
const cleanBoardFromAPI = (board:Board):Board => cloneDeep(board);
const cleanListFromAPI = (list:List):List => cloneDeep(list);

export const cleanCardsFromAPI = (cards: Card[]): {[key: string]: Card} =>
    keyBy(map(cards, cleanCardFromAPI), 'id');

export const cleanBoardsFromAPI = (boards: Board[]): {[key: string]: Board} =>
    keyBy(map(boards, cleanBoardFromAPI), 'id');

export const cleanListsFromAPI = (lists: List[]): {[key: string]: List} =>
    keyBy(map(lists, cleanListFromAPI), 'id');
