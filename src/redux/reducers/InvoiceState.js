const initialState={
    listOfInvoice:[],
    invoiceData:[],
    message:"",
    color:""
}

const InvoiceState=(state=initialState,action)=>{
    switch (action && action.type) {
        case "SAVE_INVOICE_LIST":
            return {...state, listOfInvoice:action.invoiceList}
        case "SAVE_INVOICE_DATA":
            return {...state, invoiceData:action.invoiceData}
        default:
           return state;
    }
}

export default InvoiceState;