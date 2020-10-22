import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Field, reduxForm, reset } from 'redux-form';
import { renderFromTextFiled, renderHiddenField } from '../utilites/FromUtilites';
import Loader from '../utilites/Loader';
import MaterialTable from 'material-table';
import { FromActions } from '../../assets/config/Config';

let BookTabelForm = (props) => {
    const { SaveMethod, reset, handleSubmit, operation, cancel } = props
    const [loading, setLoading] = useState(false);
    return <>
        <form onSubmit={handleSubmit(values => SaveMethod({ data: values, setLoading, operation }))}>
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
                    isEditHidden: rowData => false,
                    isDeletable: rowData => true,
                    isDeleteHidden: rowData => false,
                    onRowAdd: newData => {
                        return new Promise(async (resolve, reject) => {
                            if (newData) {
                                SaveMethod({ data: newData, resolve, tableData, action: FromActions.CR })
                            } else {
                                reject();
                            }
                        }
                        )
                    },
                    onRowUpdate: (newData, oldData) => {
                        return new Promise(async (resolve, reject) => {
                            if (newData) {
                                SaveMethod({ data: newData, resolve, tableData, action: FromActions.ED })
                            } else {
                                reject();
                            }
                        })
                    },
                    onRowDelete: oldData => {
                        return new Promise(async (resolve, reject) => {
                            if (oldData) {
                                SaveMethod({ data: oldData, resolve, tableData, action: FromActions.DE })
                            } else {
                                reject();
                            }
                        })
                    }
                }}
            />}
    </>
}

export {
    BookTabelForm,
    OrderFoodTabel
}