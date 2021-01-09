import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RoomBookingAction from '../../redux/actions/RoomBookingAction'
import Loader from '../utilites/Loader';
import RoomBookingShedular from './RoomBookingSheduler';
import { RoomTable } from './RoomBookUtilites';
class RoomBookingManagement extends Component {
    state = { 
        loadRoomBooking:false
    }

    // this method fetch required data
    componentDidMount=async()=>{
        const { authrizations }=this.props.LoginState
        const { roomList}=this.props.RoomBookingState
        const { getRoomList}=this.props.RoomBookingAction
        await this.handelLoadRoomBooking();
        (roomList && roomList.length <= 0) && await getRoomList(authrizations);
        await this.handelLoadRoomBooking();
    }

     // this method will used for loading
     handelLoadRoomBooking=()=>{ this.setState({loadRoomBooking : !this.state.loadRoomBooking})}

    render() { 
        const { loadRoomBooking }=this.state
        return loadRoomBooking ? <Loader message="Loading" size={40} />: this.loadRoomTable()
    }


    // this method will help to show room tabel
    loadRoomTable=()=>{
        return <RoomTable props={this.props}/>
    }

    // this method will help to right side
    loadSectionTwo=()=>{
        return  <RoomBookingShedular />
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    RoomBookingAction: bindActionCreators(RoomBookingAction,dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomBookingManagement);