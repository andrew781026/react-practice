import React from "react";

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

        return (
            <div>
                <FEE0109Q_header handleQueryAction={this.handleQueryAction.bind(this)}/>
                <br/><br/>
                {this.state.isQueried ? <FEE0109Q_body/> : ''}
            </div>
        );
    }
}


export default FEE0109Q;
