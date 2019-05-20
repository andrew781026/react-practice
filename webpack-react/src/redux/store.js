import {combineReducers} from 'redux';
import UserRedux from './actionReducers/user';


export default combineReducers({
    user: UserRedux.Reducer
});
