import React from 'react';
import {Route} from 'react-router-dom';
import App from '../App';
import ReactTable from '../components/reactTable';


export default () => {
    return (
        <div>
            <Route exact path='/' component={App}/>
            <Route exact path='/reactTable' component={ReactTable}/>
        </div>
    );
}
