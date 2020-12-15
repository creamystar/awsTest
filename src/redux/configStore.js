import {createStore, combineReducers,applyMiddleware} from 'redux';
import rank from './modules/rank';
import {createBrowserHistory} from 'history';

import thunk from 'redux-thunk';

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

export const history = createBrowserHistory;

const rootReducer = combineReducers({rank});
const store = createStore(rootReducer,enhancer);
export default store;