import { CreateInstance, HeaderConfig } from '../../assets/config/Config';

// this method will get list of invoice
const getListOfInvoice=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/invoice/list',HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceList(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

// this method will get invoice data by id
const getInvoiceById=(invoiceId,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/invoice/getData/'+invoiceId,HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceById(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

// this method will save invoice
const postInvoiceData=(invoiceData, authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/invoice/save',invoiceData,HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceData(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

// this method will update invoice
const updateInvoiceData=(invoiceID,invoiceData, authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .put('/api/invoice/update/'+invoiceID,invoiceData,HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceData(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

// this method will delete invoice
const deleteInvoiceData=(invoiceID,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .delete('/api/invoice/delete/'+invoiceID,HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceData(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
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



export {
    getListOfInvoice,
    postInvoiceData,
    updateInvoiceData,
    deleteInvoiceData,
    getInvoiceById
}