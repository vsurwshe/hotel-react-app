import React from 'react';
import MaterialTable from "material-table";
import { connect } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FromActions } from '../../assets/config/Config';
import { Button } from '@material-ui/core';

const StoreTable=(props)=>{
    console.log("Props",props)
    const { fromAction, deleteMethod }=props
    const { listOfStoreItem }=props.StoreState

    const columns = [
        { title: 'Sr.\u00a0No.', field: 'key', width: 20 },
        { title: 'Project\u00a0Name', field: 'projectName' },
        { title: 'Client\u00a0Name', field: 'clientName' },
        { title: 'Resources', field: 'resource', width: 30 },
        { title: 'Status', field: 'status', width: 60 },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return<VisibilityIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.VI,true)} />
          }
        },
        {
          title: "",
          width:8,
          render: (rowData)=> {
              return<CreateIcon variant="contained" color="primary" onClick={()=>fromAction(rowData.data,FromActions.ED,true)} />
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
            { icon: () => <div><Button variant="contained" color="primary">Create Project</Button></div>,
              onClick: (event, rowData) => { fromAction(null, FromActions.CR); },
              isFreeAction: true,
              tooltip: 'Create Project'
            }
          ]}
        />

}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(StoreTable);