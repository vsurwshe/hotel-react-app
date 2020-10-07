import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import { Field, reduxForm, reset } from 'redux-form';
import { renderFromTextFiled } from '../utilites/FromUtilites';
import Loader from '../utilites/Loader';

const StoreFrom=(props)=>{
    const {SaveMethod, pristine, reset, submitting, handleSubmit, operation, cancel }=props
    const [loading, setLoading] = useState(false);
    return <div className="card" style={{width:"100%"}}>
        <div className="card-header">
            <h5 className="card-title">Hotel Table</h5>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit( values=>SaveMethod({data: values, setLoading}))}>
                {LoadFileds()}
                {loading && <Loader message="Saving Record" size={50} />}
                <center>
                    <Button type="submit" variant="outlined" color="primary" disabled={pristine || submitting}>  SUBMIT</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>&nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={async () => {await reset(); await cancel()}}> Cancel</Button>
                </center>
            </form>
        </div>
    </div>
}

const LoadFileds=()=>{
    return <>
        <div className="row">
            <div className="col-md-6 pr-1">
                <Field name="product_name" component={renderFromTextFiled} placeholder="Enter product name" label="Product name" type="text" />
            </div>
            <div className="col-md-6 px-1">
                <Field name="product_qty" component={renderFromTextFiled} placeholder="Enter product quantity" label="Product quantity" type="text" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 pr-1">
                <Field name="product_unit_price" component={renderFromTextFiled}  placeholder="Enter product per unit price" label="Product per unit price" type="text" />
            </div>
            <div className="col-md-6 px-1">
                <Field name="product_total_price" component={renderFromTextFiled}  placeholder="Enter total product price" label="Total product price" type="text" />
            </div>
        </div>
    </>
}

const afterSubmit = (result, dispatch) => dispatch(reset('Store'));
export default reduxForm({form:"Store", onSubmitSuccess: afterSubmit })(StoreFrom);