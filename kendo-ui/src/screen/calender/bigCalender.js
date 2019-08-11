import React from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import "react-big-calendar/lib/css/react-big-calendar.css";

let allViews = Object.keys(Views).map(k => Views[k]);

const localizer = momentLocalizer(moment);


function Event({ event }) {
    return (
        <span>
      <strong>{event.title}</strong>
            {event.desc && ':  ' + event.desc}
    </span>
    )
}

function EventAgenda({ event }) {
    return (
        <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
    )
}

const customDayPropGetter = date => {
    if (date.getDate() === 7 || date.getDate() === 15)
        return {
            className: 'special-day',
            style: {
                border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
            },
        }
    else return {}
}

const customSlotPropGetter = date => {
    if (date.getDate() === 7 || date.getDate() === 15)
        return {
            className: 'special-day',
        }
    else return {}
}

const BigCalendar = props => (
    <div>
        <Calendar
            events={events}
            views={[Views.AGENDA]}
            localizer={localizer}
            dayPropGetter={customDayPropGetter}
            slotPropGetter={customSlotPropGetter}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100vh" }}
            components={{
                event: Event,
                agenda: {
                    event: EventAgenda,
                },
            }}
        />
    </div>
);


export default BigCalendar;
