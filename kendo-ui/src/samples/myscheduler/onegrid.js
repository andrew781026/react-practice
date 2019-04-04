import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';


class OneGrid extends React.Component {

    static propTypes = {
        holiday_type: PropTypes.string,
        minus_days: PropTypes.number,
        date: PropTypes.instanceOf(Date)
    };

    render() {

        const {holiday_type = '@', minus_days = '3'} = this.props;

        return (
            <div className='flex flex-1 flex-col'>
                <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
                    <span style={{fontSize: 20}}>  {moment(this.props.date).date()}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className='flex flex-1 justify-center bg-grey-dark'>
                        {holiday_type}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
                        {minus_days}
                    </div>
                </div>
            </div>
        );
    }
}

export default OneGrid;
