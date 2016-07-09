/* @flow */
import {getAllBoards} from '../actions/fetching/boards';
import {getAllCardsFromBoards} from '../actions/fetching/cards';
import {startScheduler, addJob, FIVE_MINUTE, ONE_DAY} from '../util/scheduler';

export const retrieveUserData = (store: any) => {

    const getBoards = () => store.dispatch(getAllBoards);
    const getCards = () => store.dispatch(getAllCardsFromBoards);

    getCards();
    getBoards();

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


    startScheduler();
};
