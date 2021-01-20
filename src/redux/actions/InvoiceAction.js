import { CreateInstance, HeaderConfig } from '../../assets/config/Config';
import { ErrorFunction, SuccessFunction } from './CommanAction';

// this method will get list of invoice
const getListOfInvoice=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/invoice/list',HeaderConfig(authrizationKey))
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveInvoiceList, response, list:true}))
            .catch(error => console.log("Error ", error))
    }
}

// this method will get invoice data by id
const getInvoiceById=(invoiceId,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/invoice/getData/'+invoiceId,HeaderConfig(authrizationKey))
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveInvoiceById, response, list:true}))
            .catch(error => console.log("Error ", error))
    }
}

// this method will save invoice
const postInvoiceData=(invoiceData, authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/invoice/save',invoiceData,HeaderConfig(authrizationKey))
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveInvoiceData, response}))
            .catch(error => ErrorFunction({error,dispatch, errorFunctionCallBack:saveInvoiceData}))
    }
}

// this method will update invoice
const updateInvoiceData=(invoiceID,invoiceData, authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/invoice/update/'+invoiceID,invoiceData,HeaderConfig(authrizationKey))
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveInvoiceData, response}))
            .catch(error => ErrorFunction({error,dispatch, errorFunctionCallBack:saveInvoiceData}))
    }
}

// this method will delete invoice
const deleteInvoiceData=(invoiceID,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/invoice/delete/'+invoiceID,HeaderConfig(authrizationKey))
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveInvoiceData, response}))
            .catch(error => ErrorFunction({error,dispatch, errorFunctionCallBack:saveInvoiceData}))
    }
}
//-----------------------

export function saveInvoiceList(invoiceList) {
    return {
        type: "SAVE_INVOICE_LIST",
        invoiceList
    }
}

export function saveInvoiceById(invoiceData) {
    return {
        type: "SAVE_INVOICE_DATA_BY_ID",
        invoiceData
    }
}

export function saveInvoiceData(invoiceData) {
    return {
        type:"SAVE_INVOICE_DATA",
        invoiceData
    }
}

export function saveMessageData(messageData) {
    return {
        type:"SAVE_MESSAGE_DATA",
        messageData
    }
}

export {
    getListOfInvoice,
    postInvoiceData,
    updateInvoiceData,
    deleteInvoiceData,
    getInvoiceById
}