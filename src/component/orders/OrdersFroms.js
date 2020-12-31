import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Field, reduxForm, reset } from 'redux-form';
import { renderFromTextFiled, renderHiddenField } from '../utilites/FromUtilites';
import Loader from '../utilites/Loader';
import MaterialTable from 'material-table';
import { FromActions } from '../../assets/config/Config';
import "./css/table.css"

// this method will load the booking hotel tabel form
let BookTabelForm = (props) => {
    const { SaveMethod, reset, handleSubmit, operation, cancel, action } = props
    const [loading, setLoading] = useState(false);
    return <>
        <form onSubmit={handleSubmit(values => SaveMethod({ data: values, setLoading, operation, action }))}>
            <div className="row">
                <Field name="table_id" component={renderHiddenField} type="text" />
                <Field name="table_name" component={renderFromTextFiled} placeholder="Enter table name" label="Table Name" type="text" />
                <Field name="table_customer_size" component={renderFromTextFiled} placeholder="Enter table customer size" label="Table Customer Size" type="text" style={{ marginLeft: 5 }} />
            </div>
            {loading && <Loader message="Booking tabel" size={30} />}
            <center>
                <Button type="submit" variant="outlined" color="primary">Book Tabel</Button>&nbsp;&nbsp;
            <Button type="button" variant="outlined" color="secondary" onClick={async () => { await reset(); await cancel() }}> Cancel</Button>
            </center>
        </form>
    </>
}

const afterSubmit = (result, dispatch) => dispatch(reset('BookTabelFrom'));
BookTabelForm = reduxForm({ form: "BookTabelFrom", onSubmitSuccess: afterSubmit, enableReinitialize: true })(BookTabelForm);

// this method will load the order food tabel by booking tabel
const OrderFoodTabel = (props) => {
    const { columns, SaveMethod, tableData } = props
    const { authrizations } = props.mainProps.LoginState
    const { getOrderFoodListByTableId } = props.mainProps.OrderAction
    const { bookedTabelFoodList } = props.mainProps.MainOrdersState
    const [loadList, setLoadList] = useState(false);
    useEffect(() => { loadInitalData() }, [])
    const loadInitalData = async () => {
        await setLoadList(true);
        await getOrderFoodListByTableId(tableData.booked_tabel_id, authrizations);
        await setLoadList(false);
    }
    return <>
        {loadList ? <Loader message="Loading food tabel list" size={50} /> :
            <MaterialTable
                title=""
                columns={columns}
                data={(bookedTabelFoodList && bookedTabelFoodList.length > 0) ? bookedTabelFoodList : []}
                options={{
                    headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
                    search: false,
                    actionsColumnIndex: -1
                }}
                icons={{ Add: () => <Button variant="contained" color="primary">Add Food</Button> }}
                editable={{
                    isEditable: rowData => true,
                    isDeletable: rowData => true,
                    onRowAdd: newData =>onOrderFoodTableActionRow({newData ,tableData, SaveMethod, action: FromActions.CR}),
                    onRowUpdate: (newData, oldData) => onOrderFoodTableActionRow({newData ,tableData, SaveMethod, action: FromActions.ED}),
                    onRowDelete: oldData => onOrderFoodTableActionRow({newData: oldData,tableData, SaveMethod, action: FromActions.DE})
                }}
            />}
    </>
}

// this method will used for ths on orderFoodTable Add
const onOrderFoodTableActionRow=(propsData)=>{
    const { newData, tableData, SaveMethod, action }=propsData
    return new Promise(async (resolve, reject) => {
        if (newData) {
            SaveMethod({ data: newData, resolve, tableData, action })
        } else {
            reject();
        }
    })
}

// this method load the main order table
const MainOrderFoodTabel = (props) => {
    const { columns, data } = props
    return<div style={{ maxWidth: "100%" }}>
        <MaterialTable
            title="Order list by tables"
            columns={columns}
            data={(data && data.length > 0) ? data : []}
            options={{
                headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
                actionsColumnIndex: -1,
                pageSize:7
            }}
            detailPanel={rowData => {
                const { data }=rowData
                let totalAomount=0;
                return <table border="1">
                    <tbody>
                        {(data && data.length >0) ? data.map((item,key)=>{
                            totalAomount=totalAomount+ parseFloat(item.order_food_total_price);
                            return <tr key={key}>
                                <td>{item.order_food_name}</td>
                                <td>{item.order_food_qty} X {item.order_food_unit_price} </td>
                                <td>{item.order_food_total_price}</td>
                            </tr>
                        }):"No Order Food"}
                         {(data && data.length >0) && <tr>
                             <td colSpan={2}><b>Total :</b></td>
                             <td>{totalAomount}</td>   
                        </tr>}
                    </tbody>
                </table>
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
    </div>
}

export {
    BookTabelForm,
    OrderFoodTabel,
    MainOrderFoodTabel
}