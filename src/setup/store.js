import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import data from '../data/index';

const middlewares = [thunk];

//make this conditional later
const logger = createLogger();
middlewares.push(logger);

const reducers = combineReducers({
    data,
});

export const store = createStore(reducers, applyMiddleware(...middlewares));
