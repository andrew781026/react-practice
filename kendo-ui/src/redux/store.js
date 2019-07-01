import {combineReducers} from 'redux';
import ReduxUser from './actionReducers/user';
import ReduxGlobal from './actionReducers/global';


export default combineReducers({
    user: ReduxUser.Reducer,
    global: ReduxGlobal.Reducer
});
