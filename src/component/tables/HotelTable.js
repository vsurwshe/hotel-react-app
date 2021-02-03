import React from 'react';
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FromActions } from '../../assets/config/Config';
import { Button } from '@material-ui/core';


const HotelTabel=(props)=>{
  const { fromAction }=props
  const { listOfHotelTable }=props.HotelTableState
  const columns = [
      { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
      { title: 'Table\u00a0Name', field: 'table_name' },
      { title: 'Customer\u00a0Size', field: 'table_customer_size',width: 10 },
      { title: 'Table\u00a0Direction', field: 'table_direction' },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<VisibilityIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.VI)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return<CreateIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.ED)} />
        }
      },
      {
        title: "",
        width:8,
        render: (rowData)=> {
            return <DeleteOutlineIcon variant="contained" color="secondary" onClick={()=>fromAction(rowData.data,FromActions.DE)} />
        }
      }  
    ];
  
  // Creating rows
  const data = (listOfHotelTable && listOfHotelTable.length > 0) && listOfHotelTable.map((item, key) => {
    return { "key": (key + 1), "data": item, ...item}
  });
    
  return <MaterialTable
    title="Hotel Tables Managment"
    columns={columns}
    data={(data && data.length > 0) ? data : []}
    options={{
      headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
    }}
    actions={[
      { icon: () => <div><Button variant="contained" color="primary">Add</Button></div>,
        onClick: (event, rowData) => { fromAction(null, FromActions.CR); },
        isFreeAction: true,
        tooltip: 'Add Table'
      }
    ]}
  />
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(HotelTabel);