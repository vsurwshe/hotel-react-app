import React from 'react';
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FromActions } from '../../assets/config/Config';
import { Button } from '@material-ui/core';

const InvoiceTabel=(props)=>{
  const { listOfInvoice }=props.InvoiceState
  const columns = [
      { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
      { title: 'Invoice\u00a0Date', field: 'product_name' },
      { title: 'Table\u00a0Name', field: 'product_qty' },
      { title: 'Amount', field: 'product_unit_price', width: 20 },
      { title: 'Time', field: 'product_total_price', width: 20 },
    //   {
    //     title: "",
    //     width:8,
    //     render: (rowData)=> {
    //         return<VisibilityIcon variant="contained" color="primary" onClick={()=>storeFromAction(rowData.data,FromActions.VI)} />
    //     }
    //   },
    //   {
    //     title: "",
    //     width:8,
    //     render: (rowData)=> {
    //         return<CreateIcon variant="contained" color="primary" onClick={()=>storeFromAction(rowData.data,FromActions.ED)} />
    //     }
    //   },
    //   {
    //     title: "",
    //     width:8,
    //     render: (rowData)=> {
    //         return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>storeFromAction(rowData.data,FromActions.DE)} />
    //     }
    //   }  
    ];
  
  // Creating rows
  const data = (listOfInvoice && listOfInvoice.length > 0) && listOfInvoice.map((item, key) => {
    return { "key": (key + 1), "data": item, ...item}
  });
    
  return <MaterialTable
    title="Invoice Managment"
    columns={columns}
    data={(data && data.length > 0) ? data : []}
    options={{
      headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
    }}
  />
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(InvoiceTabel);