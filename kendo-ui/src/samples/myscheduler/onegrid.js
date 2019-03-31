import React from 'react';

import moment from 'moment';

class OneGrid extends React.Component {


    render() {

        return (
            <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
                    <span style={{fontSize: 20}}>  {moment(this.props.date).date()}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>@</div>
                    <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>3</div>
                </div>
            </div>
        );
    }
}

export default OneGrid;
