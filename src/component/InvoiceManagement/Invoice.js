import React,{useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as InvoiceAction from "../../redux/actions/InvoiceAction"
import Loader from '../utilites/Loader';
import moment from 'moment'

const Invoice=(props)=>{
    const { data }=props
    const { invoiceDataById }=props.InvoiceState
    const { authrizations }=props.LoginState
    const { getInvoiceById, saveMessageData}=props.InvoiceAction
    const [count, setCountValues] = useState(0)
    let exitsInvoiceDataById= (invoiceDataById && invoiceDataById.length >0) && invoiceDataById.filter(item=> item.invoice_id === data.invoice_id)
    if((exitsInvoiceDataById === false || exitsInvoiceDataById.length <= 0) && count ===0){
         getInvoiceDetails({getInvoiceById, authrizations, data, count, setCountValues, saveMessageData}) 
         exitsInvoiceDataById= (invoiceDataById && invoiceDataById.length >0) && invoiceDataById.filter(item=> item.invoice_id === data.invoice_id)
    }
    return (exitsInvoiceDataById && exitsInvoiceDataById.length > 0) ? <Loader message="Loading..." size={40} /> : MainTableSection({"mainProps":props}) 
}

// this method calling invoice api for fecthing data
const getInvoiceDetails=async({getInvoiceById, authrizations, data, count, setCountValues,saveMessageData})=>{
    await setCountValues(count+1)
    await getInvoiceById(data.invoice_id, authrizations)
    await saveMessageData([]);
}

const MainTableSection=(propsData)=>{
    const { mainProps }=propsData
    return <table id="hotelInvoiceId">
                <tbody>
                    {FormSection({mainProps})}
                    {ToSection({mainProps})}
                    {InvoiceItems({mainProps})}
                    {Footer({mainProps})}
                </tbody>
        </table>
}

// this will load the from Section row
const FormSection=(propsData)=>{
    const { mainProps }=propsData
    const { invoiceDataById}=mainProps.InvoiceState
    const { userDetails }=mainProps.LoginState
    return<table style={{width: "100%"}}>
        <tbody>
            <tr>
                <td>
                    <p style={{fontSize:15 }}>
                    <b>Name:</b> {userDetails && userDetails.company_name}<br/>
                    <b>Email:</b> {userDetails && userDetails.email}<br/>
                    <b>Contact:</b> {userDetails && userDetails.mobile_number}<br/>
                    <b>Registered Address:</b> {userDetails && userDetails.company_address}<br/>
                    </p>
                </td>
                <td>
                    <p style={{fontSize:15, float: "right"}}>
                        Invoice #: <b>{invoiceDataById && invoiceDataById.invoice_id}</b> <br />
                        Date:<b>{mainProps && new moment(invoiceDataById.created_at).format('YYYY-MM-DD') }</b><br/>
                        Time:<b>{mainProps && new moment(invoiceDataById.created_at).format('HH:MM:ss a') }</b>
                    </p>  
                </td>
            </tr>
        </tbody>
    </table>
}

// this will load the to info details row
const ToSection=(propsData)=>{
    const { mainProps }=propsData
    const { invoiceDataById}=mainProps.InvoiceState
    return <table>
            <tbody>
                <tr>
                    <td>
                        <p style={{fontSize:12}}>
                            <b>To,<br/>
                            Tabel:</b>{invoiceDataById && invoiceDataById.invoice_table}
                        </p>
                    </td>
                </tr>
            </tbody>
    </table> 
}

const InvoiceItems=(propsData)=>{
    const { mainProps }=propsData
    const { invoiceDataById}=mainProps.InvoiceState
    return <table border="0">
        <thead>
            <tr style={{backgroundColor:"gainsboro"}}>
                <td>Name</td>
                <td>Unit Price</td>
                <td>Qty</td>
                <td style={{float:"right"}}>Amount</td>
            </tr>
        </thead>
        <tbody>
            {(invoiceDataById && invoiceDataById.invoice_item && invoiceDataById.invoice_item.length >0) &&
                invoiceDataById.invoice_item.map((item,key)=>{
                    return <tr key={key} style={{backgroundColor:"whitesmoke"}}>
                        <td>{item.invoice_item_name}</td>
                        <td>{item.invoice_item_price}</td>
                        <td>{item.invoice_item_qty}</td>
                        <td style={{float:"right"}}>{item.invoice_item_total_price}</td>
                    </tr>
                })
            }
        </tbody>
    </table> 
}

// this component will load footer
const Footer=(propsData)=>{
    const { mainProps }=propsData
    const { invoiceDataById}=mainProps.InvoiceState
    return <table>
            <tbody style={{float:"right"}}>
                {(invoiceDataById && Object.keys(invoiceDataById).length >2) &&<>
                    <tr style={{backgroundColor:"gold"}}>
                        <td> <b>Subtotal:</b></td>
                        <td style={{float:"right"}}> {invoiceDataById.invoice_sub_total} /-</td>
                    </tr>
                    <tr style={{backgroundColor:"lightgray"}}>
                        <td><b>GST:</b></td>
                        <td style={{float:"right"}}> {invoiceDataById.invoice_gst} /-</td>
                    </tr>
                    <tr style={{backgroundColor:"limegreen"}}>
                        <td><b>Total:</b></td>
                        <td style={{float:"right"}}> {invoiceDataById.invoice_total_price} /-</td>
                    </tr></>
                }
            </tbody>
    </table>
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    InvoiceAction: bindActionCreators(InvoiceAction,dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);