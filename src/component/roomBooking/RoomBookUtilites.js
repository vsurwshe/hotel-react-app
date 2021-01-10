import React,{useState} from 'react';
import MaterialTable from 'material-table';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { AppBar, Button, Dialog, Grid, IconButton, makeStyles, Slide, Toolbar, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
import { Field, formValueSelector, reduxForm, reset } from 'redux-form';
import { renderFromTextFiled, renderHiddenField } from '../utilites/FromUtilites';
import { connect } from 'react-redux';
import Loader from '../utilites/Loader';
import moment from 'moment';

// this component will help to load room table
const RoomTable=(propsData)=>{
    const { props, handelRoomBooking }=propsData
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
            return room_booking_status > 0 ? "ROOM BOOKED ":<EventSeatIcon variant="contained" color="primary" onClick={()=>handelRoomBooking(FromActions.CR,rowData)} />
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

// this component will help to load room table
const RoomBookingTable=(propsData)=>{
    const { props, handelRoomBooking }=propsData
    const { listOfBookedRoom }=props.RoomBookingState
    const columns = [
        { title: 'Sr.\u00a0No.', field: 'Key', width: 20, editable:"never", },
        { title: 'Check\u00a0In\u00a0Date', 
          field: 'check_in_date',
          render:(rowData)=> {
            const { check_in_date }=rowData
            return check_in_date && new moment(check_in_date).format('YYYY-MM-DD')
          }  
        },
        { title: 'Check\u00a0Out\u00a0Date', 
          field: 'check_out_date', 
          width: 20,
          render:(rowData)=> {
            const { check_out_date }=rowData
            return check_out_date && new moment(check_out_date).format('YYYY-MM-DD')
          } 
        }, 
        { title: 'No\u00a0Of\u00a0Customer', field: 'room_booking_customer_size', width: 20 },  
        { title: 'Booked\u00a0On\u00a0Date', 
          field: 'created_at', 
          width: 20,
          render:(rowData)=> {
            const { created_at }=rowData
            return created_at && new moment(created_at).format('YYYY-MM-DD HH:MM:ss a')
          }  
        },
        {
            title: "",
            width:8,
            render: (rowData)=> {
                return<VisibilityIcon variant="contained" color="primary" onClick={()=>handelRoomBooking(FromActions.VI,rowData)} />
            }
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return<CreateIcon variant="contained" color="primary" onClick={()=>handelRoomBooking(FromActions.ED,rowData)} />
          }
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>handelRoomBooking(FromActions.DE,rowData)} />
          }
        } 
    ];
    let data= (listOfBookedRoom && listOfBookedRoom.length >0) && listOfBookedRoom.map((item,key)=>{return {...item,'Key':(key+1)}})
    return <MaterialTable
        title="Room Booking Management"
        columns={columns}
        data={(data && data.length > 0) ? data : []}
        options={{
          headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
        }}
    />
}

// this style used for the model
const useStyles = makeStyles((theme) => ({
    appBar: {
    //   position: 'relative',
    height:"5%"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    toolbar:{
        marginTop:-30    
    }
}));

// this transition of model
const Transition = React.forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });

// this compoent help to fill room booking form
const RoomBookingModel=(propsData)=>{
    const { roomBookingOpen, handelRoomBooking, props, operation, SaveMethod, initialValues, roomData}=propsData
    const { authrizations }=props.LoginState
    const { roomBookingDataById }=props.RoomBookingState
    const { getRoomBookingRecordById }=props.RoomBookingAction
    const [loading, setLoading] = useState(false);
    const [callCount, setCallCount] = useState(0)
    const classes = useStyles();
    if((operation === FromActions.VI || operation === FromActions.ED || operation === FromActions.DE) && callCount === 0){
        setCallCount(callCount+1);
        getRoomBookingDetails({authrizations, getRoomBookingRecordById, id: roomData.room_booking_id, setLoading})
    }
    let modifyedRoomBookingData= (roomBookingDataById && Object.keys(roomBookingDataById).length >=6) && [roomBookingDataById].map(item=>{
        return {
            ...item,
            "check_in_date": item.check_in_date && new moment(item.check_in_date).format("YYYY-MM-DDTHH:MM"),
            "check_out_date": item.check_out_date && new moment(item.check_out_date).format("YYYY-MM-DDTHH:MM")
        }
    })
    console.log("DARA ",modifyedRoomBookingData);
    return <Dialog fullScreen open={roomBookingOpen} onClose={handelRoomBooking} TransitionComponent={Transition}>
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton style={{float:"left", marginLeft:"-35%"}} edge="start" color="inherit" onClick={()=>handelRoomBooking()} aria-label="close"> <CloseIcon /> </IconButton>
        <Typography variant="h5" className={classes.title}> Room Booking form </Typography>
      </Toolbar>
    </AppBar>
    {loading ? <Loader message="Saving...." size={40}  /> :
        <RoomBookingForm 
            props={props} 
            operation={operation} 
            setLoading={setLoading} 
            SaveMethod={SaveMethod} 
            initialValues={ (operation === FromActions.VI || operation === FromActions.ED  ||operation === FromActions.DE)? modifyedRoomBookingData[0] : initialValues} 
    />}
  </Dialog>
}

// this method will help to call room booking details by id 
const getRoomBookingDetails=async({authrizations, getRoomBookingRecordById, id, setLoading})=>{
    await setLoading(true);
    await getRoomBookingRecordById(id, authrizations);
    await setLoading(false);
}

// this will compoent load form fileds on model
let RoomBookingForm=(propsData)=>{
    const {SaveMethod, reset, handleSubmit, operation, customer_dto, room_booking_dto, setLoading}=propsData
    return<form onSubmit={handleSubmit( values=>SaveMethod({customer_dto, room_booking_dto,values, setLoading,operation}))}>
        <Grid container spacing={6}>
            <Field name="room_booking_id" component={renderHiddenField} />
            <Grid item xs={12} sm={6} >
                <Grid item style={{marginTop:"13%"}}> <LoadCustomerFileds /> </Grid>
            </Grid>
            <Grid item xs={12} sm={6} >
                <Grid item style={{marginTop:"13%"}}><LoadRoomFileds /> </Grid>
            </Grid>
        </Grid>
        <center>
            {(operation !== FromActions.VI) &&<><Button type="submit" variant="outlined" color="primary">{operation}</Button>&nbsp;&nbsp;
            <Button type="button" variant="outlined" color="secondary" onClick={reset}> Clear Values</Button>&nbsp;&nbsp; </>}
        </center>
    </form>
}

// this method will load customer data releated fields
const LoadCustomerFileds=(propsData)=>{
    return <>
        <div className="row">
            <div className="col-md-12 pr-1">
                <Field name="customer_name" component={renderFromTextFiled} placeholder="Enter customer name" label="Customer name" type="text" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 pr-1">
                <Field name="customer_card_number" component={renderFromTextFiled} placeholder="Enter customer card number" label="Customer card number" type="text" />
            </div>
            <div className="col-md-12 pr-1">
                <Field name="customer_card_type" component={renderFromTextFiled}  placeholder="Enter customer card type" label="Customer card type" type="text" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 pr-1">
                <Field name="customer_email" component={renderFromTextFiled}  placeholder="Enter customer email" label="Customer email" type="email" />
            </div>
            <div className="col-md-6 pr-1">
                <Field name="customer_mobile_number" component={renderFromTextFiled}  placeholder="Enter customer contact number" label="Customer mobile number" type="text" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 pr-1">
                <Field name="customer_address" component={renderFromTextFiled}  placeholder="Enter customer address" label="Customer address" type="text" />
            </div>
        </div>
        
    </>
}

// this method will load room fileds releated fields
const LoadRoomFileds=(propsData)=>{
    return <>
        <div className="row">
            <div className="col-md-6 pr-1">
                <Field name="check_in_date" component={renderFromTextFiled} label="Check in date" type="datetime-local" />
            </div>
            <div className="col-md-6 pr-1">
                <Field name="check_out_date" component={renderFromTextFiled} label="Chech out date" type="datetime-local" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 pr-1">
                <Field name="room_booking_customer_size" component={renderFromTextFiled}  placeholder="Enter number of customer" label="Number of customer" type="text" />
            </div>
            <div className="col-md-6 pr-1">
                <Field name="room_booking_gst" component={renderFromTextFiled}  placeholder="Enter gst" label="GST" type="text" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 pr-1">
                <Field name="room_id" component={renderFromTextFiled}  placeholder="Enter room id" label="Room id" type="text" disabled />
            </div>
        </div>
    </>
}

const afterSubmit = (result, dispatch) => dispatch(reset('RoomBookingForm'));
RoomBookingForm= reduxForm({ form:"RoomBookingForm", 
afterSubmit, 
enableReinitialize : true,
keepDirtyOnReinitialize : true
})(RoomBookingForm)

// Decorate with connect to read form values
const selector = formValueSelector('RoomBookingForm') // <-- same as form name
RoomBookingForm = connect(state => {
  // or together as a group
  const { customer_name, customer_email ,customer_card_number,customer_card_type,customer_mobile_number,customer_address } = selector(state, 'customer_name', 'customer_email','customer_card_number','customer_card_type','customer_mobile_number','customer_address')
  const { check_in_date, check_out_date,room_booking_customer_size,room_booking_gst,room_id } = selector(state, 'check_in_date', 'check_out_date','room_booking_customer_size','room_booking_gst','room_id')
  return {
    customer_dto: [{
        customer_name, 
        customer_email,
        customer_card_number,
        customer_card_type,
        customer_mobile_number,
        customer_address
    }],
    room_booking_dto:[{
        check_in_date, 
        check_out_date,
        room_booking_customer_size,
        room_booking_gst,
        room_id
    }]
  }
})(RoomBookingForm)

export{
    RoomTable,
    RoomBookingModel,
    RoomBookingTable
}