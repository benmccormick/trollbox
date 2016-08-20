/* @flow */
import {getTrelloClient} from '../../setup/trello_client';
import {cleanListsFromAPI} from '../../util/api_cleaner';
import {map, flatten} from 'lodash';
import {getSourceBoards} from '../../data/boards';
import type {List} from '../../interfaces/trello';
import type { dispatchFn, getStateFn } from '../../interfaces/redux';

export const UPDATE_LISTS = 'UPDATE_LISTS';

//return a promise of getting cards for a particular board
const getListsFromBoard = (boardId: string, t: any): List[] => t.get(`boards/${boardId}/lists`);

const updateListsFromLists = (dispatch: dispatchFn) =>
    (listsList: List[]): void => dispatch({
        type: UPDATE_LISTS,
        lists: cleanListsFromAPI(flatten(listsList)),
    });

const getListsFromEachBoard = (dispatch: dispatchFn, getState: getStateFn) => (t: any) => {
    let getListsFromBoardId = boardId => getListsFromBoard(boardId, t);
    let selectedBoards = getSourceBoards(getState());
    let fetchPromises = map(selectedBoards, getListsFromBoardId);
    Promise.all(fetchPromises)
        .then(updateListsFromLists(dispatch))
        .catch(() => {
            console.log('something went wrong fetching lists and it is really sad.');
        });
};

export const getAllListsFromBoards = (dispatch: dispatchFn, getState: getStateFn) => {
    getTrelloClient().then(getListsFromEachBoard(dispatch, getState));
};
