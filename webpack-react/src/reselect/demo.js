import React from 'react';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from 'visibleTodoList';

const App = () => (
    <div>
        <VisibleTodoList listId="1" />
        <VisibleTodoList listId="2" />
        <VisibleTodoList listId="3" />
    </div>
);
