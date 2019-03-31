import React from 'react';

import kendo from '@progress/kendo-ui';
import {Scheduler} from '@progress/kendo-scheduler-react-wrapper';


class SchedulerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.date = new Date("2013/6/13");
        this.events = this.props.events
    }

    getEventTemplate() {

        return (
            `<div class="movie-template">
                <img src="#= image #"/>
                <p>
                    #: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #
                </p>
                <h3>#: title #</h3>
                <a href="#= imdb #">Movie in IMDB</a>
            </div>`
        );
    }

    render() {

        /*
        * Scheduler Component
        *
        * date : 圈選的日期
        * dataSource : 不同時間上的預約 or  以前的會議
        * height : Scheduler 高度
        *
        * 目前缺少中文化設定
        * */

        return (
            <div>
                <Scheduler date={this.date}
                           views={['month']}
                           eventTemplate={this.getEventTemplate()}
                           height={600}
                           dataSource={this.events}/>
            </div>
        );
    }
}

class LocalScheduler extends React.Component {

    render() {

        const data = [
            {
                title: "Fast and furious 6",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-help.jpg",
                imdb: "http://www.imdb.com/title/tt1905041/",
                start: new Date("2013/6/13 17:00"),
                end: new Date("2013/6/13 18:30")
            },
            {
                title: "The Internship",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-internship.jpg",
                imdb: "http://www.imdb.com/title/tt2234155/",
                start: new Date("2013/6/13 14:00"),
                end: new Date("2013/6/13 15:30")
            },
            {
                title: "The Perks of Being a Wallflower",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/wallflower.jpg",
                imdb: "http://www.imdb.com/title/tt1659337/",
                start: new Date("2013/6/13 16:00"),
                end: new Date("2013/6/13 17:30")
            },
            {
                title: "The Help",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-help.jpg",
                imdb: "http://www.imdb.com/title/tt1454029/",
                start: new Date("2013/6/13 12:00"),
                end: new Date("2013/6/13 13:30")
            },
            {
                title: "Now You See Me",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/now-you-see-me.jpg",
                imdb: "http://www.imdb.com/title/tt1670345/",
                start: new Date("2013/6/13 10:00"),
                end: new Date("2013/6/13 11:30")
            },
            {
                title: "Fast and furious 6",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/fast-and-furious.jpg",
                imdb: "http://www.imdb.com/title/tt1905041/",
                start: new Date("2013/6/13 19:00"),
                end: new Date("2013/6/13 20:30")
            },
            {
                title: "The Internship",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-internship.jpg",
                imdb: "http://www.imdb.com/title/tt2234155/",
                start: new Date("2013/6/13 17:30"),
                end: new Date("2013/6/13 19:00")
            },
            {
                title: "The Perks of Being a Wallflower",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/wallflower.jpg",
                imdb: "http://www.imdb.com/title/tt1659337/",
                start: new Date("2013/6/13 17:30"),
                end: new Date("2013/6/13 19:00")
            },
            {
                title: "The Help",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/the-help.jpg",
                imdb: "http://www.imdb.com/title/tt1454029/",
                start: new Date("2013/6/13 13:30"),
                end: new Date("2013/6/13 15:00")
            },
            {
                title: "Now You See Me",
                image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/now-you-see-me.jpg",
                imdb: "http://www.imdb.com/title/tt1670345/",
                start: new Date("2013/6/13 12:30"),
                end: new Date("2013/6/13 14:00")
            }
        ];

        return (
            <SchedulerContainer events={data}/>
        );
    }
}


export default LocalScheduler;
