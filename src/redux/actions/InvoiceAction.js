import { CreateInstance, HeaderConfig } from '../../assets/config/Config';

const getListOfInvoice=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/invoice/list',HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceList(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const postInvoiceData=(invoiceData, authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/invoice/save',invoiceData,HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceData(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const updateInvoiceData=(invoiceID,invoiceData, authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .put('/api/invoice/update/'+invoiceID,invoiceData,HeaderConfig(authrizationKey))
            .then(response => dispatch(saveInvoiceData(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

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
    deleteInvoiceData
}