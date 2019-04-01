import React from 'react';

import moment from 'moment';

import './css/main.css';


class OneGrid extends React.Component {


    render() {

        return (
            <div className='flex flex-1 flex-col'>
                <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
                    <span style={{fontSize: 20}}>  {moment(this.props.date).date()}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className='flex flex-1 justify-center bg-grey-dark'>@</div>
                    <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>3</div>
                </div>
            </div>
        );
    }
}

export default OneGrid;
