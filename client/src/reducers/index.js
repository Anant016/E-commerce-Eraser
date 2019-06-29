import { combineReducers } from 'redux'
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import prodReducer from './prodReducer';

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    prod:prodReducer

})