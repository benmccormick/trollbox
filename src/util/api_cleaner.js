/* @flow */
import {map, cloneDeep, keyBy} from 'lodash';
import type {Card, Board} from '../interfaces/trello';

//no cleaning for now, just cloning
const cleanCardFromAPI = (card:Card):Card => cloneDeep(card);
const cleanBoardFromAPI = (board:Board):Board => cloneDeep(board);

export const cleanCardsFromAPI = (cards: Card[]): {[key: string]: Card} =>
    keyBy(map(cards, cleanCardFromAPI), 'id');

export const cleanBoardsFromAPI = (boards: Board[]): {[key: string]: Board} =>
    keyBy(map(boards, cleanBoardFromAPI), 'id');
