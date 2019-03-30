// import UserService from '../../service/user';
import axios from 'axios';


const Action = {
    GET_USER: 'GET_USER',
    GET_USERS: 'GET_USERS',
    FETCH_USERS: 'FETCH_USERS',
    ADD_USER: 'ADD_USER',
    UPDATE_USER: 'UPDATE_USER',
    REMOVE_USER: 'REMOVE_USER',
};


const ActionCreator = {
    fetchUsers() {
        return async (dispatch) => {
            try {
                const res = await axios.get('http://react-ssr-api.herokuapp.com/users');
                const users = res.data; // await UserService.getUsers();
                const action = {type: Action.FETCH_USERS, users};
                dispatch(action);
                return users;
            } catch (error) {
                throw dispatch({error});
            }
        };
    },
};


const initialState = {
    list: []
};

const Reducer = function (state = initialState, action) {
    switch (action.type) {
        case Action.FETCH_USERS: {

            const newUsers = action.users;

            return {
                ...state,
                list: newUsers
            };
        }
        default: {
            return state;
        }
    }
};

export default {Action, ActionCreator, Reducer};
