import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import ReduxUser from '../redux/actionReducers/user';

class AddTodo extends Component {


    changeTempTodo = (e) => {
        const newTodo = e.target.value;
        this.setState({tempTodo: newTodo});
    };

    addTodo = () => {
        this.props.addTodo(this.state.tempTodo);
        this.setState({tempTodo: ''});
    };

    render() {

        const {tempTodo} = this.state || {};

        return (
            <span>
                新增代辦事項: <input type="text" value={tempTodo || ''} onChange={this.changeTempTodo}/>
                <button onClick={this.addTodo}>新增</button>
            </span>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTodo: ReduxUser.ActionCreator.addTodo,
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(AddTodo));
