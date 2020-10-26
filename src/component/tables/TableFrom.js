import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import { Field, reduxForm, reset } from 'redux-form';
import { capitalizeFirstLatter, renderFromTextFiled } from '../utilites/FromUtilites';
import Loader from '../utilites/Loader';
import { FromActions } from '../../assets/config/Config';

const HotelTabelFrom=(props)=>{
    const {SaveMethod, pristine, reset, submitting, handleSubmit, operation, cancel }=props
    const [loading, setLoading] = useState(false);
    return  <div className="card" style={{width:"100%"}}>
        <div className="card-header">
            <h5 className="card-title">{capitalizeFirstLatter(operation+"")} Hotel Table Record</h5>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(values=> SaveMethod({data:values, setLoading, operation}))}>
                    {LoadFileds()}
                    {loading && <Loader message={capitalizeFirstLatter(operation)+" Record"} size={50} />}
                    <center>
                        {operation !== FromActions.VI &&  <><Button type="submit" variant="outlined" color="primary" disabled={(pristine || submitting) && operation !== FromActions.DE}>{operation}</Button> &nbsp;&nbsp;
                        <Button type="button" variant="outlined" color="secondary" disabled={pristine || submitting} onClick={reset}> Clear Values</Button>&nbsp;&nbsp; </>}
                        <Button type="button" variant="outlined" color="secondary" onClick={async () => {await reset(); await cancel()}}> Cancel</Button>
                    </center>
            </form>
        </div>
    </div>
}

const LoadFileds=()=>{
    return<>
    <div className="row">
        <div className="col-md-4 pr-1">
            <Field name="table_name" component={renderFromTextFiled} placeholder="Enter table name" label="Table Name" type="text" />
        </div>
        <div className="col-md-4 px-1">
            <Field name="table_customer_size" component={renderFromTextFiled} placeholder="Enter table customer size" label="Table Customer Size" type="text" />
        </div>
        <div className="col-md-4 pl-1">
            <Field name="table_direction" component={renderFromTextFiled}  placeholder="Enter table directions" label="Table Directions" type="text" />
        </div>
    </div>
</>
}

const afterSubmit = (result, dispatch) => dispatch(reset('HotelTableForm'));
export default reduxForm({
    form: 'HotelTableForm', 
    onSubmitSuccess: afterSubmit,
    enableReinitialize: true
})(HotelTabelFrom);