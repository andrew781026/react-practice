const Action = {
    INIT_TODO_LIST: 'INIT_TODO_LIST',
    ON_TODO_CLICK: 'ON_TODO_CLICK',
    ADD_TODO: 'ADD_TODO',
};


const ActionCreator = {
    onTodoClick() {
        return async (dispatch) => {

            return false;
        };
    },
    addTodo(todo) {

        return {type: Action.ADD_TODO, todo};
    },
    initTodoList() {

        const sampleTodoList = [
            {id: 1, completed: 'Y', text: `good-${new Date().getTime()}`},
            {id: 2, text: `so-${new Date().getTime()}`},
            {id: 3, completed: 'Y', text: `well-${new Date().getTime()}`},
            {id: 4, text: `nice-${new Date().getTime()}`},
            {id: 5, completed: 'Y', text: `red-${new Date().getTime()}`},
            {id: 6, text: `green-${new Date().getTime()}`}
        ];

        return {type: Action.INIT_TODO_LIST, todos: sampleTodoList};
    },
};


const initialState = {
    todos: []
};

const Reducer = function (state = initialState, action) {
    switch (action.type) {
        case Action.INIT_TODO_LIST: {

            const newTodos = action.todos;
            return {...state, todos: newTodos};
        }
        case Action.ON_TODO_CLICK: {

            const newTodo = action.todo;
            return {...state, todos: [...state.todos, newTodo]};
        }
        case Action.ADD_TODO: {

            const newTodo = action.todo;
            const newTodos = [...state.todos, {text: newTodo, id: state.todos.length + 2}];

            console.log('newTodo=', newTodo);
            console.log('newTodos=', newTodos);

            return {...state, todos: newTodos};
        }
        default: {
            return state;
        }
    }
};

export default {Action, ActionCreator, Reducer};
