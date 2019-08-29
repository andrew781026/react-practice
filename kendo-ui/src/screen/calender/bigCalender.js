import React from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function EventAgenda({event}) {
    return (
        <span>
      <em style={{color: 'magenta'}}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
    )
}


let BigCalendar = () => (
    <Calendar
        events={events}
        localizer={localizer}
        style={{height: "100vh"}}
        defaultDate={new Date(2015, 3, 1)}
        views={[Views.MONTH]}
        defaultView={Views.MONTH}
        components={{
            month: {
                event: EventAgenda,
            },
        }}
    />
);


export default BigCalendar;
