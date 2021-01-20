const initialState={
    listOfInvoice:[],
    invoiceData:[],
    invoiceDataById:[],
    messageData:[],
    color:""
}

const InvoiceState=(state=initialState,action)=>{
    switch (action && action.type) {
        case "SAVE_INVOICE_LIST":
            return {...state, listOfInvoice:action.invoiceList}
        case "SAVE_INVOICE_DATA_BY_ID":
            return {...state, invoiceDataById:action.invoiceData}
        case "SAVE_INVOICE_DATA":
            return {...state, invoiceData:action.invoiceData.data, messageData:{message:action.invoiceData.message}}
        case "SAVE_MESSAGE_DATA":
            return {...state, messageData:action.messageData}
        default:
           return state;
    }
}

export default InvoiceState;