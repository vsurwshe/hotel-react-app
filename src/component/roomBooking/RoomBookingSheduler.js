import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Query from 'devextreme/data/query';

const views = ['day', 'week', 'month'];

// this is main compoent
const RoomBookingShedular = (propsData) => {
    const { props }=propsData
    const { listOfBookedRoom }=props.RoomBookingState
    let filterData= (listOfBookedRoom && listOfBookedRoom.length >0 )&& listOfBookedRoom.map((item)=>{
        return {
            roomBookingId:item.room_booking_id,
            text:"Booked Room "+item.room_id,
            startDate: new Date(item.check_in_date),
            endDate: new Date(item.check_out_date)
        }
    })
    return <Card>
        <CardHeader title="Room Booking Calender" />
        <CardContent>
            <LoadShedular data={filterData} props={props}/>
        </CardContent>
    </Card>
}

// this method will help to loading shedular with options
const LoadShedular = (propsData) => {
    const { data, props }=propsData
    const { listOfBookedRoom, customerList }=props.RoomBookingState
    return <Scheduler
        timeZone="Asia/Kolkata"
        dataSource={data}
        views={views}
        defaultCurrentView="day"
        defaultCurrentDate={new Date()}
        height={500}
        startDayHour={8} 
        editing={{ allowAdding: false }}
        onAppointmentFormOpening={data=> onRoomFormOpening({data,listOfBookedRoom, customerList })}
    />
}

// this component will loading to show compoent from
const onRoomFormOpening=(propsData)=>{
    const { data, listOfBookedRoom, customerList }=propsData
    let form = data.form,
    roomInfo = geRoomById({id:data.appointmentData.roomBookingId, listOfBookedRoom }) || {},
    customerInfo=geCustomerById({id:roomInfo.customer_id,customerList}) || {};
    form.option('items', [ 
        {
            label: { text: 'Customer Name' },
            name: 'customer_name',
            editorType: 'dxTextBox',
            editorOptions: {
              value: customerInfo.customer_name,
              readOnly: true
            }
        },
        {
            label: { text: 'Customer Card Number' },
            name: 'customer_card_number',
            editorType: 'dxTextBox',
            editorOptions: {
              value: customerInfo.customer_card_number,
              readOnly: true
            }
        },
        {
            label: { text: 'Customer Card Type' },
            name: 'customer_card_type',
            editorType: 'dxTextBox',
            editorOptions: {
              value: customerInfo.customer_card_type,
              readOnly: true
            }
        }, 
        {
            label: { text: 'Customer Contact' },
            name: 'customer_mobile_number',
            editorType: 'dxTextBox',
            editorOptions: {
              value: customerInfo.customer_mobile_number,
              readOnly: true
            }
        }, 
        {
            label: { text: 'Customer Check IN date' },
            dataField: 'startDate',
            editorType: 'dxDateBox',
            editorOptions: {
              width: '100%',
              type: 'datetime',
              readOnly: true
            }
        }, 
        {
            label: { text: 'Customer Check OUT date' },
            name: 'endDate',
            dataField: 'endDate',
            editorType: 'dxDateBox',
            editorOptions: {
              width: '100%',
              type: 'datetime',
              readOnly: true
            }
        }
    ]);
}

// this will used for finding room data by id
const geRoomById=({id,listOfBookedRoom})=>{
    return Query(listOfBookedRoom).filter(['room_booking_id', id]).toArray()[0];
}
 
// this will used for finding customer data by id
const geCustomerById=({id,customerList})=>{
    return Query(customerList).filter(['customer_id', id]).toArray()[0];
}

export default RoomBookingShedular;