import React from 'react';
import {Route} from 'react-router-dom';
import App from '../App';
import FEE0742R from '../screen/FEE0742R';


export default () => {
    return (
        <div>
            <Route exact path='/' component={App}/>
            <Route exact path='/FEE0742R' component={FEE0742R}/>
            <Route exact path='/hi' component={() => 'Hi'}/>
        </div>
    );
}
