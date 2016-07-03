import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import data from '../data/index';
import persistState from 'redux-localstorage';

const middlewares = [thunk];

//make this conditional later
const logger = createLogger();
middlewares.push(logger);

let enhancer = compose(
    applyMiddleware(...middlewares),
    persistState()
);


const reducers = combineReducers({
    data,
});

export const store = createStore(reducers, enhancer);
