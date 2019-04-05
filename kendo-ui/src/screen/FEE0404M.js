import React from "react";

import FEE0404R_header from './header/FEE0404M_header';
import MyScheduler from '../samples/myscheduler/main';

class FEE0404M extends React.Component {


    render() {

        return (
            <div>
                <FEE0404R_header/>
                <br/><br/>
                <MyScheduler/>
            </div>
        );
    }
}


export default FEE0404M;
