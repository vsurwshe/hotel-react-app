import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const data = [
    {
        text: 'App 1',
        startDate: new Date('2021-01-2 T16:30:00.000Z'),
        endDate: new Date('2021-01-4 T18:30:00.000Z')
    }, {
        text: 'App 2',
        startDate: new Date('2021-01-5 T19:00:00.000Z'),
        endDate: new Date('2021-01-9T20:00:00.000Z'),
        allDay: true
    }, {
        text: 'App 3',
        startDate: new Date('2021-01-10 T21:30:00.000Z'),
        endDate: new Date('2021-01-14T22:30:00.000Z')
    }
];

const views = ['day', 'week', 'month'];

// this is main compoent
const RoomBookingShedular = (propsData) => {
    return <Card>
        <CardHeader title="Room Booking Calender" />
        <CardContent>
            <LoadShedular />
        </CardContent>
    </Card>
}

const LoadShedular = (propsData) => {
    return <Scheduler
        timeZone="Asia/Kolkata"
        dataSource={data}
        views={views}
        defaultCurrentView="day"
        defaultCurrentDate={new Date()}
        height={500}
        startDayHour={8} />
}

export default RoomBookingShedular;