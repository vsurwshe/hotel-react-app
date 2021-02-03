import MaterialTable from 'material-table';
import React from 'react';
import { connect } from 'react-redux';

// this compoent will help to load customer table
const CustomerTable=(propsData)=>{
    const { customerList }=propsData.RoomBookingState
    const columns = [
        { title: 'Sr.\u00a0No.', field: 'Key', width: 20 },
        { title: 'Customer\u00a0Name', field: 'customer_name' },
        { title: 'Customer\u00a0ID', field: 'customer_card_number', width: 20 }, 
        { title: 'Customer\u00a0ID\u00a0Type', field: 'customer_card_type', width: 20 },  
        { title: 'Customer\u00a0Contact', field: 'customer_mobile_number', width: 20 },
    ];
    let data= (customerList && customerList.length >0) && customerList.map((item,key)=>{return {...item,'Key':(key+1)}})
    return <MaterialTable
        title="Customer List"
        columns={columns}
        data={(data && data.length > 0) ? data : []}
        options={{
          headerStyle: { backgroundColor: '#01579b', color: '#FFF' }
        }}
    />
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);