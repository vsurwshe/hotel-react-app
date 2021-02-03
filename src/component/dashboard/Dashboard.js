import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginAction from '../../redux/actions/LoginAction'
import * as RoomBookingAction from '../../redux/actions/RoomBookingAction'
import RoomBookingShedular from '../roomBooking/RoomBookingSheduler';

class Dashboard extends Component {
    state = { 
        loadDashBoard:false
    }

    // this method will used for handling loaddashborad
    handelLoadDashboard=()=>{this.setState({loadDashBoard : !this.state.loadDashBoard})}

    componentDidMount=async()=>{
        const { authrizations }=this.props.LoginState
        const { listOfBookedRoom, customerList }=this.props.RoomBookingState
        const { getBookedRoomList, getCustomerList }= this.props.RoomBookingAction
        await this.handelLoadDashboard();
        (listOfBookedRoom && listOfBookedRoom.length <=0) && await getBookedRoomList(authrizations);
        (customerList && customerList.length <=0) && await getCustomerList(authrizations);
        await this.handelLoadDashboard();
        
    }
    render() { 
        return  <RoomBookingShedular
            props={this.props}
        />
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToPorps=dispatch=>({
    dispatch,
    LoginAction : bindActionCreators(LoginAction, dispatch),
    RoomBookingAction : bindActionCreators(RoomBookingAction, dispatch)
})
export default connect(mapStateToProps,mapDispatchToPorps)(Dashboard);