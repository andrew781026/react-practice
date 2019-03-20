import React from 'react';
import TodoList from './components/todoList';
import AddItem from './components/addItem';

const App = () => (
    <div>
        <AddItem/>
        <TodoList/>
    </div>
);

export default App;