import React from 'react';
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import moment from 'moment'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FromActions } from '../../assets/config/Config';

const InvoiceTabel=(props)=>{
  const {openModel}=props
  const { listOfInvoice }=props.InvoiceState
  const columns = [
      { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
      { title: 'Invoice\u00a0Date', 
        field: 'created_at',
        render:(rowData)=> {
          const { created_at }=rowData
          return created_at && new moment(created_at).format('YYYY-MM-DD')
        } 
      },
      { title: 'Table\u00a0Name', field: 'invoice_table' },
      { title: 'Amount', field: 'invoice_total_price', width: 20 },
      { title: 'Time', 
        field: 'updated_at', 
        width: 20,
        render:(rowData)=> {
          const { updated_at }=rowData
          return updated_at && new moment(updated_at).format('HH:MM:ss a')
        } 
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<VisibilityIcon variant="contained" color="primary" onClick={()=> openModel(rowData.data, FromActions.VI)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>openModel(rowData.data, FromActions.DE)} />
        }
      }  
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