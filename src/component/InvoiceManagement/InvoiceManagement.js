import React, { Component } from 'react';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InvoiceTabel from './InvoiceTabel';
import * as InvoiceAction from "../../redux/actions/InvoiceAction"
import Loader from '../utilites/Loader';
import Invoice from './Invoice';
import { dwonloadInvoice } from '../utilites/FromUtilites';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
class InvoiceManagement extends Component {
    state = { 
        loadInvoiceValue: false,
        viewInvoice:false,
        fetchedInvoiceData:[],
        action:""
    }

    componentDidMount=async()=>{
        const { authrizations }=this.props.LoginState
        const { listOfInvoice }=this.props.InvoiceState
        const { getListOfInvoice }= this.props.InvoiceAction
        await this.handelLoadInvoiceValue();
        (listOfInvoice && listOfInvoice.length <=0) && await getListOfInvoice(authrizations);
        await this.handelLoadInvoiceValue();
    }

    // this method will used for view invoice model
    handelViewInvoice=(fetchedInvoiceData, action)=>{ this.setState({viewInvoice : !this.state.viewInvoice, fetchedInvoiceData, action}) }

    // this method will used for loading
    handelLoadInvoiceValue=()=>{ this.setState({loadInvoiceValue : !this.state.loadInvoiceValue})}
    
    render() { 
        const { loadInvoiceValue }= this.state
        return loadInvoiceValue ? <Loader message="Loading..." size={50} /> : <>{this.loadInvoiceTabel()}{this.loadInvoiceModel()}</>
    }

    // this method will used for show invoice table
    loadInvoiceTabel=()=>{ 
        return <InvoiceTabel openModel={this.handelViewInvoice} />
    }

    // this method will used for the loading invoice model
    loadInvoiceModel=()=>{
        const { viewInvoice, fetchedInvoiceData, action }=this.state
        return <Dialog open={viewInvoice} onClose={()=>this.handelViewInvoice()} fullWidth={true} maxWidth = {'md'}>
            <DialogContent>
                <Invoice data={fetchedInvoiceData} />
                <div style={{float:"right", marginTop:10}}>
                    { action === FromActions.VI && <Button type="button" variant="outlined" color="primary" onClick={() => dwonloadInvoice("hotelInvoiceId")}> Download Invoice </Button>}
                    { action === FromActions.DE && <Button type="button" variant="outlined" color="primary" onClick={() => this.deleteInvoice()}> Delete Invoice </Button>}
                    &nbsp;&nbsp;<Button type="button" variant="outlined" color="secondary" onClick={() => this.handelViewInvoice() }> Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    }

    // this method will used for deleteing invoice
    deleteInvoice=async()=>{
        const {fetchedInvoiceData }=this.state
        const { authrizations }=this.props.LoginState
        const { getListOfInvoice, deleteInvoiceData }= this.props.InvoiceAction
        var makeInvoice = window.confirm("Are you sure want to delete invoice ?");
        if(makeInvoice){
            await this.handelLoadInvoiceValue();
            await deleteInvoiceData(fetchedInvoiceData.invoice_id, authrizations)
            setTimeout(async()=>{
                await getListOfInvoice(authrizations);
                await this.handelViewInvoice();
                await this.handelLoadInvoiceValue();
            }, API_EXE_TIME)
        }
    }
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    InvoiceAction: bindActionCreators(InvoiceAction,dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceManagement);