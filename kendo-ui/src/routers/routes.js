import React from 'react';
import {Route} from 'react-router-dom';
import App from '../App';
import FEE0742R from '../screen/FEE0742R';
import Scheduler from '../samples/scheduler/main';
import PivotGrid from '../samples/pivotgrid/main';
import TreeList from '../samples/treelist/main';
import Spreadsheet from '../samples/spreadsheet/main';
import FilterGrid from '../components/filter-grid';


export default () => {
    return (
        <div>
            <Route exact path='/' component={App}/>
            <Route exact path='/hi' component={() => 'Hi'}/>
            <Route exact path='/FilterGrid' component={FilterGrid}/>
            <Route exact path='/FEE0742R' component={FEE0742R}/>
            <Route exact path='/PivotGrid' component={PivotGrid}/>
            <Route exact path='/TreeList' component={TreeList}/>
            <Route exact path='/Scheduler' component={Scheduler}/>
            <Route exact path='/Spreadsheet' component={Spreadsheet}/>
        </div>
    );
}
