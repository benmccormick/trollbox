/* @flow */
import {getAllBoards} from '../actions/fetching/boards';
import {getAllCardsFromBoards} from '../actions/fetching/cards';
import {getAllListsFromBoards} from '../actions/fetching/lists';
import {getAllUsersFromBoards} from '../actions/fetching/users';
import {startScheduler, addJob, FIVE_MINUTE, ONE_DAY} from '../util/scheduler';

export const retrieveUserData = (store: any) => {

    const getBoards = () => store.dispatch(getAllBoards);
    const getCards = () => store.dispatch(getAllCardsFromBoards);
    const getLists = () => store.dispatch(getAllListsFromBoards);
    const getUsers = () => store.dispatch(getAllUsersFromBoards);

    getCards();
    getBoards();
    getLists();
    getUsers();

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
