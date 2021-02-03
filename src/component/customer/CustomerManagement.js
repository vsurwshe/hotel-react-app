import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RoomBookingAction from '../../redux/actions/RoomBookingAction'
import Loader from '../utilites/Loader';
import CustomerTable from './CustomerTable';

class CustomerManagment extends Component {
    state = { 
        loadCustomer:false
    }

    componentDidMount=async()=>{
        const { authrizations }=this.props.LoginState
        const { customerList }=this.props.RoomBookingState
        const { getCustomerList}=this.props.RoomBookingAction
        await this.handelCustomerValue();
        (customerList && customerList.length <= 0) && await getCustomerList(authrizations);
        await this.handelCustomerValue();
    }

    // this will help to handel customer values
    handelCustomerValue=()=>{ this.setState({loadCustomer : !this.state.loadCustomer})}

    render() { 
        const { loadCustomer }=this.state
        return loadCustomer ? <Loader message="loading...." size={40} /> : this.loadCustomerTable()
    }

    // this method will help to loading customer table
    loadCustomerTable=()=>{
        return <CustomerTable />
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    RoomBookingAction: bindActionCreators(RoomBookingAction,dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerManagment);