/* @flow */
import {getTrelloClient} from '../../setup/trello_client';
import {cleanUsersFromAPI} from '../../util/api_cleaner';
import {map, flatten} from 'lodash';
import {getSourceBoards} from '../../data/boards';
import type {User} from '../../interfaces/trello';
import type { dispatchFn, getStateFn } from '../../interfaces/redux';

export const UPDATE_USERS = 'UPDATE_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

//return a promise of getting cards for a particular board
const getUsersFromBoard = (boardId: string, t: any): User[] => t.get(`boards/${boardId}/members`, {
    fields: 'username,fullName,url,initials,avatarHash,avatarSource'
});

const updateUsersFromLists = (dispatch: dispatchFn) =>
    (usersList: User[]): void => dispatch({
        type: UPDATE_USERS,
        users: cleanUsersFromAPI(flatten(usersList)),
    });

const getUsersFromEachBoard = (dispatch: dispatchFn, getState: getStateFn) => (t: any) => {
    let getUsersFromBoardId = boardId => getUsersFromBoard(boardId, t);
    let selectedBoards = getSourceBoards(getState());
    let fetchPromises = map(selectedBoards, getUsersFromBoardId);
    Promise.all(fetchPromises)
        .then(updateUsersFromLists(dispatch))
        .catch(() => {
            /* eslint-disable no-console */
            console.log('something went wrong fetching users and it is really sad.');
            /* eslint-enable no-console*/
        });
};

export const getCurrentUser = (dispatch: dispatchFn) => {
    getTrelloClient().then((t: any) => {
        t.get('members/me').then((user: User) => {
            dispatch({
                type: SET_CURRENT_USER,
                userId: user.id,
            });
        });
    });
};

export const getAllUsersFromBoards = (dispatch: dispatchFn, getState: getStateFn) => {
    getTrelloClient().then(getUsersFromEachBoard(dispatch, getState));
    getCurrentUser(dispatch);
};
