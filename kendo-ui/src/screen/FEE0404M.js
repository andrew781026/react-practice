import React from "react";

import FEE0404R_header from './header/FEE0404M_header';
import MyScheduler from '../samples/myscheduler/main';

class FEE0404M extends React.Component {

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

        return (
            <div>
                <FEE0404R_header handleQueryAction={this.handleQueryAction.bind(this)}/>
                <br/><br/>
                {this.state.isQueried ? <MyScheduler/> : ''}
            </div>
        );
    }
}


export default FEE0404M;
