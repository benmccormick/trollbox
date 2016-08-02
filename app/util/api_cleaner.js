/* @flow */
import {map, cloneDeep, keyBy} from 'lodash';
import type {Card, Board, List, User} from '../interfaces/trello';
import type {CardMap, ListMap, BoardMap, UserMap} from '../interfaces/redux';

//no cleaning for now, just cloning
const cleanCardFromAPI = (card:Card):Card => cloneDeep(card);
const cleanBoardFromAPI = (board:Board):Board => cloneDeep(board);
const cleanListFromAPI = (list:List):List => cloneDeep(list);
const cleanUserFromAPI = (user:User):User => cloneDeep(user);

export const cleanCardsFromAPI = (cards: Card[]): CardMap =>
    keyBy(map(cards, cleanCardFromAPI), 'id');

export const cleanBoardsFromAPI = (boards: Board[]): BoardMap =>
    keyBy(map(boards, cleanBoardFromAPI), 'id');

export const cleanListsFromAPI = (lists: List[]): ListMap =>
    keyBy(map(lists, cleanListFromAPI), 'id');

export const cleanUsersFromAPI = (users: User[]): UserMap =>
    keyBy(map(users, cleanUserFromAPI), 'id');
