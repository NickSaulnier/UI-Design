import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { loginReducer } from './reducers/login';
import { userReducer } from './reducers/user';
import { tagsReducer } from './reducers/tags';
import { threadsReducer } from './reducers/threads';

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    tags: tagsReducer,
    threads: threadsReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));