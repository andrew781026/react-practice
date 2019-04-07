import React from 'react';

import MyOneGrid from './onegrid';

import moment from 'moment';

import {Button} from "@material-ui/core";

import data from './data.json';

const DateUtil = {
    getMonthArray({year, month}) {

        const monthFirstDate = new Date(year, month, 1);
        const monthLastDate = moment(monthFirstDate).endOf('month');
        const dayAmountOfThisMonth = monthLastDate.diff(monthFirstDate, 'days');
        const weekAmountOfThisMonth = Math.ceil(dayAmountOfThisMonth / 7);

        let currentDate = monthFirstDate;
        const monthArray = [];
        for (let i = 0; i < weekAmountOfThisMonth; i++) {
            const weekArray = this.getWeekArray(currentDate);
            monthArray.push(weekArray);
            currentDate = this.addSevenDay(currentDate);
        }

        return monthArray;
    },
    getMonthArrayWithDate(date) {
        return this.getMonthArray({year: moment(date).year(), month: moment(date).month()});
    },
    getWeekArray(date) {

        const from_date = moment(date).startOf('week').toDate();
        const to_date = moment(date).endOf('week').toDate();

        return this.getWeeklyDateArray({startDate: from_date, endDate: to_date});
    },
    getWeekDay(date) {
        return moment(date).weekday();  // Number
    },
    getWeeklyDateArray({startDate, endDate}) {

        const dateArray = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dateArray.push(currentDate);
            currentDate = this.addOneDay(currentDate);
        }
        return dateArray;
    },
    addOneDay(date) {
        return moment(date).add(1, 'days').toDate();
    },
    addSevenDay(date) {
        return moment(date).add(7, 'days').toDate();
    },
    getMonth(date) {
        return date.getMonth();
    },
};

class SchedulerContainer extends React.Component {

    state = {
        currentData: data,
        editData: {}
    };

    handleDataChange = (date, holiday_type, minus_days) => {

        const date_str = moment(date).format('YYYY-MM-DD');

        const new_edit_data = {holiday_mark: holiday_type, diff_day: minus_days};

        const new_currentData = {...this.state.currentData, [date_str]: new_edit_data};
        const new_editData = {...this.state.editData, [date_str]: new_edit_data};

        this.setState({currentData: new_currentData, editData: new_editData});
    };

    render() {

        const now = new Date();
        const thisMonth = DateUtil.getMonth(now);
        const monthArray = DateUtil.getMonthArrayWithDate(now);

        console.log('editData=', this.state.editData);

        let i = 0;

        return (
            <table style={{border: '3px #cccccc solid', width: '100%'}} cellPadding="10" border='1'>
                <thead>
                <tr className='bg-grey-lighter'>
                    <td>
                        <Button variant="contained" color="primary">
                            上個月
                        </Button>
                    </td>
                    <td colSpan={5} style={{fontWeight: 600, textAlign: 'center', fontSize: 20}}>
                        <h2>2019年4月</h2>
                    </td>
                    <td align="right">
                        <Button variant="contained" color="primary">
                            下個月
                        </Button>
                    </td>
                </tr>
                <tr className='bg-grey-lighter' style={{fontWeight: 600, textAlign: 'center', fontSize: 20}}>
                    <td width='14%'>日</td>
                    <td width='14%'>一</td>
                    <td width='14%'>二</td>
                    <td width='14%'>三</td>
                    <td width='14%'>四</td>
                    <td width='14%'>五</td>
                    <td width='14%'>六</td>
                </tr>
                </thead>
                <tbody>
                {monthArray.map(weekArray => {
                    return (
                        <tr key={i++}>
                            {weekArray.map(date => {

                                const date_str = moment(date).format('YYYY-MM-DD');

                                if (DateUtil.getMonth(date) !== thisMonth) {

                                    return (
                                        <td key={i++} className='bg-black'/>
                                    );

                                } else if (this.state.currentData[date_str]) {

                                    const dateInfo = this.state.currentData[date_str];

                                    return (
                                        <td key={i++}>
                                            <MyOneGrid date={date}
                                                       holiday_type={dateInfo.holiday_mark}
                                                       minus_days={dateInfo.diff_day}
                                                       handleDataChange={this.handleDataChange.bind(this)}/>
                                        </td>
                                    );

                                } else {

                                    return (
                                        <td key={i++}>
                                            <MyOneGrid date={date}
                                                       handleDataChange={this.handleDataChange.bind(this)}/>
                                        </td>
                                    );
                                }
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}

export default SchedulerContainer;
