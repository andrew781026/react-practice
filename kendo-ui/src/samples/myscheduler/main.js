import React from 'react';

import MyOneGrid from './onegrid';

import moment from 'moment';

import {Button} from "@material-ui/core";

class SchedulerContainer extends React.Component {

    getMonthArray({year, month}) {

        const monthFirstDate = new Date(year, month, 1);
        const monthLastDate = moment(monthFirstDate).endOf('month');
        const thisMonthDayAmont = monthLastDate.diff(monthFirstDate, 'days');
        const thisMonthWeekAmont = Math.ceil(thisMonthDayAmont / 7);

        let currentDate = monthFirstDate;
        const monthArray = [];
        for (let i = 0; i < thisMonthWeekAmont; i++) {
            const weekArray = this.getWeekArray(currentDate);
            monthArray.push(weekArray);
            currentDate = this.addSevenDay(currentDate);
        }

        return monthArray;
    }

    getMonthArrayWithDate = (date) => {
        return this.getMonthArray({year: moment(date).year(), month: moment(date).month()});
    };

    getWeekArray = (date) => {

        const from_date = moment(date).startOf('week').toDate();
        const to_date = moment(date).endOf('week').toDate();

        return this.getWeeklyDateArray({startDate: from_date, endDate: to_date});
    };

    getWeekDay(date) {
        return moment(date).weekday();  // Number
    }

    getWeeklyDateArray = ({startDate, endDate}) => {

        const dateArray = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dateArray.push(currentDate);
            currentDate = this.addOneDay(currentDate);
        }
        return dateArray;
    };

    addOneDay(date) {
        return moment(date).add(1, 'days').toDate();
    }

    addSevenDay(date) {
        return moment(date).add(7, 'days').toDate();
    }

    getMonth(date) {
        return date.getMonth();
    }

    render() {

        const now = new Date();
        const thisMonth = this.getMonth(now);
        const monthArray = this.getMonthArrayWithDate(now);

        return (
            <table style={{border: '3px #cccccc solid', width: '100%'}} cellPadding="10" border='1'>
                <thead>
                <tr className='bg-grey-lighter'>
                    <td width= '14%'>
                        <Button variant="contained" color="primary">
                            上個月
                        </Button>
                    </td>
                    <td width= '70%' colSpan={5} style={{fontWeight: 600, textAlign: 'center', fontSize: 20}}>
                        <h2>2019年4月</h2>
                    </td>
                    <td width= '14%' align="right">
                        <Button variant="contained" color="primary" >
                            下個月
                        </Button>
                    </td>
                </tr>
                <tr className='bg-grey-lighter' style={{fontWeight: 600, textAlign: 'center', fontSize: 20}}>
                    <td>日</td>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>四</td>
                    <td>五</td>
                    <td>六</td>
                </tr>
                </thead>
                <tbody>
                {monthArray.map(weekArray => {
                    return (
                        <tr>
                            {weekArray.map(date => {

                                console.log('date=', date);

                                if (this.getMonth(date) !== thisMonth) {

                                    return (
                                        <td className='bg-black'/>
                                    );

                                } else if (date.getDate() === 1) {

                                    return (
                                        <td>
                                            <MyOneGrid date={date} holiday_type='!' minus_days={9}/>
                                        </td>
                                    );

                                } else {

                                    return (
                                        <td>
                                            <MyOneGrid date={date}/>
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
