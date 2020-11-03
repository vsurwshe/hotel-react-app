import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InvoiceTabel from './InvoiceTabel';
import * as InvoiceAction from "../../redux/actions/InvoiceAction"
import Loader from '../utilites/Loader';
class InvoiceManagement extends Component {
    state = { 
        loadInvoiceValue: false
    }

    componentDidMount=async()=>{
        const { authrizations }=this.props.LoginState
        const { listOfInvoice }=this.props.InvoiceState
        const { getListOfInvoice }= this.props.InvoiceAction
        await this.handelLoadInvoiceValue();
        (listOfInvoice && listOfInvoice.length <=0) && await getListOfInvoice(authrizations);
        await this.handelLoadInvoiceValue();
    }

    handelLoadInvoiceValue=()=>{ this.setState({loadInvoiceValue : !this.state.loadInvoiceValue})}
    
    render() { 
        const { loadInvoiceValue }= this.state
        return loadInvoiceValue ? <Loader message="Loading..." size={50} /> : this.loadInvoiceTabel()
    }

    loadInvoiceTabel=()=> <InvoiceTabel />
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    InvoiceAction: bindActionCreators(InvoiceAction,dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceManagement);