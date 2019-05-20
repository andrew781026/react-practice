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

                const users = [
                    {id: 1, name: '呂布'},
                    {id: 2, name: '劉備'},
                    {id: 3, name: '劉邦'},
                    {id: 4, name: '項羽'},
                    {id: 5, name: '悟空'},
                    {id: 6, name: '張飛'},
                ];
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
