import React from "react";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReduxGlobal from '../redux/actionReducers/global';

import FEE0109Q_header from './header/FEE0109Q_header';
import FEE0109Q_body from './body/FEE0109Q_body';


class FEE0109Q extends React.Component {

    state = {
        isQueried: false
    };

    handleQueryAction = () => {

        this.setState({isQueried: true})
    };

    showKeyCode(event) {
        console.log('event.keyCode=', event.keyCode);
    }

    componentDidMount() {
        // global key function
        document.addEventListener("keydown", this.showKeyCode, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.showKeyCode, false);
    }

    render() {

        console.log('this.props.searchText=', this.props.searchText);

        return (
            <div>
                <FEE0109Q_header handleQueryAction={this.handleQueryAction.bind(this)}/>
                <br/><br/>
                {this.state.isQueried ? <FEE0109Q_body/> : ''}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openAlertDialog: ReduxGlobal.ActionCreator.openAlertDialog,
        openDataDialog: ReduxGlobal.ActionCreator.openDataDialog,
        openLoadingMask: ReduxGlobal.ActionCreator.openLoadingMask,
        closeLoadingMask: ReduxGlobal.ActionCreator.closeLoadingMask,
    }, dispatch);
}

function mapStateToProps({global: {searchText}}) {
    return {searchText}
}

export default connect(mapStateToProps, mapDispatchToProps)(FEE0109Q);
