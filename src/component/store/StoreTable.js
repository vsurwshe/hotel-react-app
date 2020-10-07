import React from 'react';
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FromActions } from '../../assets/config/Config';
import { Button } from '@material-ui/core';

const StoreTable=(props)=>{
  const { storeFromAction, deleteMethod }=props
  const { listOfStoreItem }=props.StoreState
  const columns = [
      { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
      { title: 'Product\u00a0Name', field: 'product_name' },
      { title: 'Product\u00a0Quantity', field: 'product_qty' },
      { title: 'Product\u00a0Per\u00a0Unit\u00a0Price', field: 'product_unit_price', width: 20 },
      { title: 'Product\u00a0Total\u00a0Price', field: 'product_total_price', width: 20 },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<VisibilityIcon variant="contained" color="primary" onClick={()=>storeFromAction(rowData.data,FromActions.VI,true)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<CreateIcon variant="contained" color="primary" onClick={()=>storeFromAction(rowData.data,FromActions.ED,true)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>deleteMethod(rowData.data)} />
        }
      }  
    ];
  
  // Creating rows
  const data = (listOfStoreItem && listOfStoreItem.length > 0) && listOfStoreItem.map((item, key) => {
    return { "key": (key + 1), "data": item, ...item}
  });
    
  return <MaterialTable
    title="Store Managment"
    columns={columns}
    data={(data && data.length > 0) ? data : []}
    options={{
      headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
    }}
    actions={[
      { icon: () => <div><Button variant="contained" color="primary">Add Item</Button></div>,
        onClick: (event, rowData) => { storeFromAction(null, FromActions.CR); },
        isFreeAction: true,
        tooltip: 'Add Item'
      }
    ]}
  />
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(StoreTable);