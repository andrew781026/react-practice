import Todo from './todo'
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import ReduxUser from '../redux/actionReducers/user';

class TodoList extends Component {

    componentDidMount() {
        this.props.initTodoList();
    }

    render() {

        const {todos, onTodoClick} = this.props;

        return (
            <ul>
                {todos.map(todo =>
                    <Todo
                        key={todo.id}
                        {...todo}
                        onClick={() => onTodoClick(todo.id)}
                    />
                )}
            </ul>
        )
    }

}

/*
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
};
*/

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onTodoClick: ReduxUser.ActionCreator.onTodoClick,
        initTodoList: ReduxUser.ActionCreator.initTodoList,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        todos: state.user.todos
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
