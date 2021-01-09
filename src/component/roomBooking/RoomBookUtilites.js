import MaterialTable from 'material-table';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { Button } from '@material-ui/core';
import { API_EXE_TIME } from '../../assets/config/Config';

// this component will help to load room table
const RoomTable=(propsData)=>{
    const { props }=propsData
    const { roomList }=props.RoomBookingState
    const columns = [
        { title: 'Sr.\u00a0No.', field: 'Key', width: 20, editable:"never", },
        { title: 'Room\u00a0Number', field: 'room_number' },
        { title: 'Room\u00a0Location', field: 'room_locations', width: 20 }, 
        { title: 'Room\u00a0Type', field: 'room_type', width: 20 },  
        { title: 'Room\u00a0Rate', field: 'room_rate', width: 20 }, 
        { title: 'Room\u00a0Booked', 
          field: 'room_booking_status', 
          editable:"never", 
          width: 20,
          render:(rowData)=> {
            const { room_booking_status }=rowData
            return room_booking_status > 0 ? "ROOM BOOKED ":<EventSeatIcon variant="contained" color="primary" />
          } 
        }
    ];
    let data= (roomList && roomList.length >0) && roomList.map((item,key)=>{return {...item,'Key':(key+1)}})
    return <MaterialTable
        title="Room Management"
        columns={columns}
        data={(data && data.length > 0) ? data : []}
        options={{
          headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
          actionsColumnIndex: -1
        }}
        icons={{
            Add: () => <Button variant="contained" color="primary">Add Room</Button>,
            Edit:()=> <CreateIcon variant="contained" color="primary" />,
            Delete: () => <DeleteOutlineIcon variant="contained" color="secondary" />
        }}
        editable={{
            isEditable: rowData => true,
            isDeletable: rowData => true,
            onRowAdd: newData => createRoomRecord({newData,"mainProps":props}),
            onRowUpdate: (newData, oldData) => updateRoomRecord({newData,oldData,"mainProps":props}),
            onRowDelete: oldData => deleteRoomRecord({oldData, "mainProps":props})
        }}
    />
}

// this method will help to create room record
const createRoomRecord=(propsData)=>{
    const { newData , mainProps}=propsData
    const { authrizations }=mainProps.LoginState
    const { createRoomRecord, getRoomList }=mainProps.RoomBookingAction
    return new Promise(async (resolve, reject) => {
        if(Object.keys(newData).length >=3){
            await createRoomRecord(newData, authrizations);
            setTimeout(async()=>{
                await getRoomList(authrizations);
                resolve();
            },API_EXE_TIME)
        }else{ reject();}
    })
}

// this method will help to update room record
const updateRoomRecord=(propsData)=>{
    const { newData , mainProps}=propsData
    const { authrizations }=mainProps.LoginState
    const { updateRoomRecord, getRoomList }=mainProps.RoomBookingAction
    return new Promise(async (resolve, reject) => {
        if(Object.keys(newData).length >=3){
            let filterData=Object.keys(newData).length >=3 &&  [newData].map(({created_at, room_booking_status, updated_at, room_id, Key,...rest})=>rest);
            await updateRoomRecord(newData.room_id, filterData[0], authrizations);
            setTimeout(async()=>{
                await getRoomList(authrizations);
                resolve();
            },API_EXE_TIME)
        }else{ reject();}
    })
}

// this method will help to delete room record
const deleteRoomRecord=(propsData)=>{
    const { oldData , mainProps}=propsData
    const { authrizations }=mainProps.LoginState
    const { deleteRoomRecord, getRoomList }=mainProps.RoomBookingAction
    return new Promise(async (resolve, reject) => {
        if(Object.keys(oldData).length >=1){
            await deleteRoomRecord(oldData.room_id, authrizations);
            setTimeout(async()=>{
                await getRoomList(authrizations);
                resolve();
            },API_EXE_TIME)
        }else{ reject();}
    })
}

export{
    RoomTable
}