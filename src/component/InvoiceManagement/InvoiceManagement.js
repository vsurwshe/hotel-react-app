import React, { Component } from 'react';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InvoiceTabel from './InvoiceTabel';
import * as InvoiceAction from "../../redux/actions/InvoiceAction"
import Loader from '../utilites/Loader';
import Invoice from './Invoice';
import { dwonloadInvoice } from '../utilites/FromUtilites';
class InvoiceManagement extends Component {
    state = { 
        loadInvoiceValue: false,
        viewInvoice:false,
        fetchedInvoiceData:[]
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
    handelViewInvoice=(fetchedInvoiceData)=>{ this.setState({viewInvoice : !this.state.viewInvoice, fetchedInvoiceData}) }

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
        const { viewInvoice, fetchedInvoiceData }=this.state
        return <Dialog open={viewInvoice} onClose={()=>this.handelViewInvoice()} fullWidth={true} maxWidth = {'md'}>
            <DialogContent>
                <Invoice data={fetchedInvoiceData} />
                <div style={{float:"right", marginTop:10}}>
                    <Button type="button" variant="outlined" color="primary" onClick={() => dwonloadInvoice("hotelInvoiceId")}> Download Invoice </Button>&nbsp;&nbsp;
                    {/* <Button type="button" variant="outlined" color="primary" onClick={() => this.callBookTabelApi({data: orderTableData, action:FromActions.DE}) }> Free table </Button>&nbsp;&nbsp; */}
                    <Button type="button" variant="outlined" color="secondary" onClick={() => this.handelViewInvoice() }> Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    }
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    InvoiceAction: bindActionCreators(InvoiceAction,dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceManagement);