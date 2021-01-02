import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import { Field, reduxForm, reset } from 'redux-form';
import { capitalizeFirstLatter, renderFromTextFiled } from '../utilites/FromUtilites';
import Loader from '../utilites/Loader';
import { FromActions } from '../../assets/config/Config';

const FoodFrom=(props)=>{
    const {SaveMethod, pristine, reset, submitting, handleSubmit, operation, cancel }=props
    const [loading, setLoading] = useState(false);
    return <div className="card" style={{width:"100%"}}>
        <div className="card-header">
            <h5 className="card-title">{capitalizeFirstLatter(operation+"")} Food Record</h5>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit( values=>SaveMethod({data: values, setLoading, operation}))}>
                {LoadFileds()}
                {loading && <Loader message={capitalizeFirstLatter(operation)+" Record"} size={50} />}
                <center>
                    { operation !== FromActions.VI &&  <><Button type="submit" variant="outlined" color="primary" disabled={(pristine || submitting) && operation !== FromActions.DE}>{operation}</Button> &nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>&nbsp;&nbsp; </>}
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
                <Field name="food_name" component={renderFromTextFiled} placeholder="Enter Food name" label="Food name" type="text" />
            </div>
            <div className="col-md-6 px-1">
                <Field name="food_price" component={renderFromTextFiled} placeholder="Enter Food price" label="Food price" type="text" />
            </div>
        </div>
    </>
}

const afterSubmit = (result, dispatch) => dispatch(reset('Food'));
export default reduxForm({form:"Food", onSubmitSuccess: afterSubmit })(FoodFrom);