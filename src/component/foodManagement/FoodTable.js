import React from 'react';
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FromActions } from '../../assets/config/Config';
import { Button } from '@material-ui/core';

const FoodTabel=(props)=>{
  const { foodFromAction }=props
  const { listOfFoodsItem }=props.FoodState
  const columns = [
      { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
      { title: 'Food\u00a0Name', field: 'food_name' },
      { title: 'Food\u00a0price', field: 'food_price' },
      // { title: 'Product\u00a0Per\u00a0Unit\u00a0Price', field: 'product_unit_price', width: 20 },
      // { title: 'Product\u00a0Total\u00a0Price', field: 'store_product_total_price', width: 20 },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<VisibilityIcon variant="contained" color="primary" onClick={()=>foodFromAction(rowData.data,FromActions.VI)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<CreateIcon variant="contained" color="primary" onClick={()=>foodFromAction(rowData.data,FromActions.ED)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>foodFromAction(rowData.data,FromActions.DE)} />
        }
      }  
    ];
  
  // Creating rows
  const data = (listOfFoodsItem && listOfFoodsItem.length > 0) && listOfFoodsItem.map((item, key) => {
    return { "key": (key + 1), "data": item, ...item}
  });
    
  return <MaterialTable
    title="Food Managment"
    columns={columns}
    data={(data && data.length > 0) ? data : []}
    options={{
      headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
    }}
    actions={[
      { icon: () => <div><Button variant="contained" color="primary">Add</Button></div>,
        onClick: (event, rowData) => { foodFromAction(null, FromActions.CR); },
        isFreeAction: true,
        tooltip: 'Add Item'
      }
    ]}
  />
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(FoodTabel);