import { Button } from '@material-ui/core';
import React, {useState} from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { renderFromTextFiled, renderHiddenField } from '../utilites/FromUtilites';
import Loader from '../utilites/Loader';

let BookTabelForm=(props)=>{
    const {SaveMethod, pristine, reset, submitting, handleSubmit, operation, cancel }=props
    const [loading, setLoading] = useState(false);
    return <>
    <form onSubmit={handleSubmit(values=> SaveMethod({data:values, setLoading, operation}))}>
        <div className="row">
            <Field name="table_id" component={renderHiddenField}type="text" />
            <Field name="table_name" component={renderFromTextFiled} placeholder="Enter table name" label="Table Name" type="text" />
            <Field name="table_customer_size" component={renderFromTextFiled} placeholder="Enter table customer size" label="Table Customer Size" type="text" style={{marginLeft:5}} />
        </div>
        {loading && <Loader message="Booking tabel" size={30} />}
        <center>
            <Button type="submit" variant="outlined" color="primary">Book Tabel</Button>&nbsp;&nbsp;
            <Button type="button" variant="outlined" color="secondary" onClick={async () => {await reset(); await cancel()}}> Cancel</Button>
        </center>
    </form>
    </>
}

const afterSubmit = (result, dispatch) => dispatch(reset('BookTabelFrom'));
BookTabelForm=reduxForm({form:"BookTabelFrom",onSubmitSuccess: afterSubmit, enableReinitialize: true})(BookTabelForm);

export{
    BookTabelForm
}