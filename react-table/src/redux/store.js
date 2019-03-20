import {combineReducers} from 'redux';
import ReduxUser from './actionReducers/user';


export default combineReducers({
    user: ReduxUser.Reducer
});
