import React from 'react';

import MyOneGrid from './onegrid';

import moment from 'moment';

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

    render() {

        const monthArray = this.getMonthArrayWithDate(new Date());

        return (
            <table style={{border: '3px #cccccc solid'}} cellPadding="10" border='1'>
                <thead>
                <tr>
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
                                return (
                                    <td>
                                        {moment(date).format('YYYY-MM-DD')}
                                    </td>
                                );
                            })}
                        </tr>
                    )
                })}
                <tr style={{height: 50}}></tr>
                {monthArray.map(weekArray => {
                    return (
                        <tr>
                            {weekArray.map(date => {

                                console.log('date=', date);

                                if (date.getDate() === 1) {

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
