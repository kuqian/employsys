import {combineReducers} from 'redux';
import createReducer from './createReducer';
import editReducer from './editReducer';
import listReducer from './listReducer';
const reducers = combineReducers({
    createReducer: createReducer,
    editReducer: editReducer,
    listReducer: listReducer
});
export default reducers;
