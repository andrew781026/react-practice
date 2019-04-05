import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';


class OneGrid extends React.Component {

    static propTypes = {
        holiday_type: PropTypes.string,
        minus_days: PropTypes.number,
        date: PropTypes.instanceOf(Date)
    };

    state = {
        editMode: false
    };

    onClickHandle = () => {
        this.setState({editMode: true});
    };

    onDoubleClickHandle = () => {
        this.setState({editMode: false});
    };

    renderInputText = (label) => {

        const {date, holiday_type, minus_days} = this.props;

        const currentValue = (label === 'holiday_type') ? holiday_type : minus_days;

        return (
            <input type="text" size={4} value={currentValue} onChange={(e) => {

                const new_holiday_type = (label === 'holiday_type') ? e.target.value : holiday_type;

                const new_minus_days = (label === 'minus_days') ? e.target.value : minus_days;

                this.props.handleDataChange(date, new_holiday_type, new_minus_days);
            }}/>
        )
    };

    render() {

        return (
            <div className='flex flex-1 flex-col' onDoubleClick={this.onDoubleClickHandle} onClick={this.onClickHandle}>
                <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
                    <span style={{fontSize: 20}}>  {moment(this.props.date).date()}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', height: 20}}>
                    <div className='flex flex-1 justify-center bg-grey-dark'>
                        {(this.state.editMode) ? this.renderInputText('holiday_type') : this.props.holiday_type}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
                        {(this.state.editMode) ? this.renderInputText('minus_days') : this.props.minus_days}
                    </div>
                </div>
            </div>
        );
    }
}

export default OneGrid;
