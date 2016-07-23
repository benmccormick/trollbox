/* @flow */
import {getAllBoards} from '../actions/fetching/boards';
import {getAllCardsFromBoards} from '../actions/fetching/cards';
import {getAllListsFromBoards} from '../actions/fetching/lists';
import {startScheduler, addJob, FIVE_MINUTE, ONE_DAY} from '../util/scheduler';

export const retrieveUserData = (store: any) => {

    const getBoards = () => store.dispatch(getAllBoards);
    const getCards = () => store.dispatch(getAllCardsFromBoards);
    const getLists = () => store.dispatch(getAllListsFromBoards);

    getCards();
    getBoards();
    getLists();

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
        name: 'Get Lists',
        jobFn: getLists,
        runOnce: false,
    });


    startScheduler();
};
