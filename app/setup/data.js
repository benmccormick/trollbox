/* @flow */
import {getAllBoards} from '../actions/fetching/boards';
import {getAllCardsFromBoards} from '../actions/fetching/cards';
import {getAllListsFromBoards} from '../actions/fetching/lists';
import {getAllUsersFromBoards} from '../actions/fetching/users';
import {startScheduler, addJob, FIVE_MINUTE, ONE_DAY} from '../util/scheduler';

type fn = () => any;

const buildFetchingFunctions = (dispatch: fn) => {
    const getBoards: fn = () => dispatch(getAllBoards);
    const getCards: fn = () => dispatch(getAllCardsFromBoards);
    const getLists: fn = () => dispatch(getAllListsFromBoards);
    const getUsers: fn = () => dispatch(getAllUsersFromBoards);

    return {
        getBoards,
        getCards,
        getLists,
        getUsers,
    };
};

export const getAllUserData = (dispatch: fn) => {
    let {getCards, getBoards, getLists, getUsers} = buildFetchingFunctions(dispatch);

    getCards();
    getBoards();
    getLists();
    getUsers();
};

const setUpJobs = (store: any) => {
    let {getCards, getBoards, getLists, getUsers} = buildFetchingFunctions(store.dispatch);
    addJob({
        interval: FIVE_MINUTE,
        name: 'Get Cards',
        jobFn: getCards,
        runOnce: false,
    });

    addJob({
        interval: ONE_DAY,
        name: 'Get Boards',
        jobFn: getBoards,
        runOnce: false,
    });

    addJob({
        interval: ONE_DAY,
        name: 'Get Users',
        jobFn: getUsers,
        runOnce: false,
    });

    addJob({
        interval: ONE_DAY,
        name: 'Get Lists',
        jobFn: getLists,
        runOnce: false,
    });


    startScheduler();
};

export const initializeUserData = (store: any) => {
    getAllUserData(store.dispatch);
    setUpJobs(store);
};
