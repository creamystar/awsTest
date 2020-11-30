import {createStore, combineReducers} from 'redux';
import rank from './modules/rank';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory;

const rootReducer = combineReducers({rank});
const store = createStore(rootReducer);
export default store;