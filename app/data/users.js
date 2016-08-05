/* @flow */
import { UPDATE_USERS, SET_CURRENT_USER } from '../actions/fetching/users';
import {assign, get, sortBy, map } from 'lodash';
import type {User} from '../interfaces/trello';
import type { actionType, UserMap } from '../interfaces/redux';

type maybestring = ?string;

export const decorateUser = (user: ?User): User => {
    if (user && user.avatarHash) {
        user.avatarURL = `https://trello-avatars.s3.amazonaws.com/${user.avatarHash}/30.png`;
    }
    return user;
};

export const getAllUsers =
    (state : any): User[] => map(sortBy(get(state, 'users'), 'id'), decorateUser);

export const getUserById =
    (state : any, id: string): User => decorateUser(get(state, ['users', id]));

export const getCurrentUserId = (state: any) => state.currentUserId;


export const currentUserId = (state : maybestring = null, action : actionType) => {
    let { type, userId} = action;
    switch (type) {
    case SET_CURRENT_USER:
        return userId;
    default:
        return state;
    }
};

export const users = (state : UserMap = {}, action: actionType) => {
    let { type, users: _users } = action;
    switch (type) {
    case UPDATE_USERS:
        return assign({}, state, _users);
    default:
        return state;
    }
};
