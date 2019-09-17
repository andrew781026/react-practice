import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/home';
import MultiDownload from './components/multiDownload';
import GameGraph from './components/game_graph';


export default () => {
    return (
        <div>
            <Route exact path='/' component={Home}/>
            <Route exact path='/hi' component={()=>'Hi'}/>
            <Route exact path='/multiDownload' component={MultiDownload}/>
            <Route exact path='/gameGraph' component={GameGraph}/>
        </div>
    );
}
