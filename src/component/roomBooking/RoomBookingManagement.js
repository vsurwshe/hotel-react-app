import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_EXE_TIME, CONSTANT_MESSAGE, FromActions } from '../../assets/config/Config';
import * as RoomBookingAction from '../../redux/actions/RoomBookingAction'
import { checkIsObject, renderSanckBar } from '../utilites/FromUtilites';
import Loader from '../utilites/Loader';
import { RoomBookingModel, RoomBookingTable, RoomTable } from './RoomBookUtilites';

class RoomBookingManagement extends Component {
    state = { 
        loadRoomBooking:false,
        roomBookingOpen:false,
        operation:"",
        roomData:[]
    }

    // this method fetch required data
    componentDidMount=async()=>{
        const { authrizations }=this.props.LoginState
        const { roomList, listOfBookedRoom}=this.props.RoomBookingState
        const { getRoomList, getBookedRoomList}=this.props.RoomBookingAction
        await this.handelLoadRoomBooking();
        (roomList && roomList.length <= 0) && await getRoomList(authrizations);
        (listOfBookedRoom && listOfBookedRoom.length <= 0) && await getBookedRoomList(authrizations);
        await this.handelLoadRoomBooking();
    }

    // this method will used for loading
    handelLoadRoomBooking=()=>{ this.setState({loadRoomBooking : !this.state.loadRoomBooking})}

    // this method will help to load roombooking model
    handelRoomBooking=(operation,roomData)=>{ this.setState({operation, roomData, roomBookingOpen: !this.state.roomBookingOpen})}

    render() { 
        const { loadRoomBooking }=this.state
        return loadRoomBooking ? <Loader message="Loading" size={40} />:<> {this.loadRoomTable()}{this.loadRoomBookingTable()}</>
    }

    // this method will help to show room tabel
    loadRoomTable=()=>{
        const { roomData }=this.props.RoomBookingState
        const { message }=roomData
        return <>
            {this.loadRoomBooking()}
            {!Array.isArray(roomData) &&((message && checkIsObject(message)) ? renderSanckBar({open:true, message:CONSTANT_MESSAGE.ERROR_MESSAGE, color:"error"}):renderSanckBar({open:true, message:message, color:"success"}))}
            <RoomTable 
                props={this.props}
                handelRoomBooking={this.handelRoomBooking}
            />
        </>
    }

    // this method will help to load room booking table
    loadRoomBookingTable=()=>{
        const { operation}=this.state
        const { roomBookingData }=this.props.RoomBookingState
        const { message }=roomBookingData
        return <div style={{marginTop:10}}>
            {!Array.isArray(roomBookingData) &&((message && checkIsObject(message)) ? renderSanckBar({open:true, message:CONSTANT_MESSAGE.ERROR_MESSAGE, color:"error"}):renderSanckBar({open:true, message:message, color:"success"}))}
            <RoomBookingTable 
                props={this.props}
                handelRoomBooking={this.handelRoomBooking}
                operation={operation}
            />
        </div>
    }

    // this will load the room booking model
    loadRoomBooking=()=>{
        const { roomBookingOpen, operation, roomData}=this.state
        let createdIntialValues= (roomData && Object.keys(roomData).length >=1) && {"room_id":roomData.room_id}
        return <RoomBookingModel 
            roomBookingOpen={roomBookingOpen}
            handelRoomBooking={this.handelRoomBooking}
            roomData={roomData}
            operation={operation}
            props={this.props}
            SaveMethod={this.callApiRoomBooking}
            initialValues={createdIntialValues}
        />
    }

    callApiRoomBooking=async(propsData)=>{
        const { customer_dto, room_booking_dto, values, setLoading, operation}=propsData
        const { authrizations }=this.props.LoginState
        const { getRoomList , createRoomBookingRecord, updateRoomBookingRecord, deleteRoomBookingRecord, getFreeRoomList,getBookedRoomList, getTodayCheckoutRoomList, getCustomerList, saveRoomBookingData}=this.props.RoomBookingAction
        let submitData={customer_dto,room_booking_dto}
        console.log("DATA ",submitData)
        await setLoading(true);
        if(operation === FromActions.CR){ 
            await createRoomBookingRecord(submitData,authrizations);
        }else if(operation === FromActions.ED){
            await updateRoomBookingRecord(values.room_booking_id, submitData,authrizations)
        }else if(operation === FromActions.DE){
            await deleteRoomBookingRecord(values.room_booking_id,authrizations)
        }
        setTimeout(async()=>{
            await getRoomList(authrizations);
            await getFreeRoomList(authrizations);
            await getBookedRoomList(authrizations);
            await getTodayCheckoutRoomList(authrizations);
            await getCustomerList(authrizations);
            await saveRoomBookingData([]);
            await setLoading(false);
            await this.handelRoomBooking();
        },API_EXE_TIME)
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    RoomBookingAction: bindActionCreators(RoomBookingAction,dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomBookingManagement);