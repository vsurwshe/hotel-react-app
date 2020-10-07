import React from 'react';
import { TextField } from '@material-ui/core';

const renderTextFiled=({type, name, placeholder, dataValidate, input, meta: { touched, invalid, error }, ...custom})=>(
    <div className="wrap-input100 validate-input m-b-23" data-validate ={dataValidate}>
        <input 
            className="input100" 
            type={type} 
            name={name} 
            error={touched && invalid}
            placeholder={placeholder} 
            {...input}
            {...custom}
        />
	</div>
)

const renderFromTextFiled=({type, name, placeholder, label, dataValidate, input, meta: { touched, invalid, error }, ...custom})=>(
    <div className="form-group">
		<label htmlFor={name} style={{fontWeight: 600}}>{label}</label>
        <input 
            type={type} 
            name={name} 
            className="form-control shadow-none" 
            id={name} 
            placeholder={placeholder}
            error={touched && invalid}
            // helperText={(touched && error) ? error : helperText}
            {...input}
            {...custom} 
        />
	</div>
)

const renderMATextField = ({ label, name, input, helperText, meta: { touched, invalid, error }, ...custom }) => (
    <TextField
      id={name}
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={(touched && error) ? error : helperText}
      {...input}
      {...custom}
    />
)

const renderPaperTextFiled=({ label, name, input, placeholder, helperText, type, meta: { touched, invalid, error }, ...custom })=>(
    <div class="form-group">    
        <label>{label}</label>
        <input 
            id={name}
            type={type}
            className="form-control" 
            placeholder={placeholder}
            error={touched && invalid}
            helperText={(touched && error) ? error : helperText}
            {...input}
            {...custom}
        />
    </div>
)
    



export{
    renderTextFiled,
    renderFromTextFiled,
    renderMATextField,
    renderPaperTextFiled
}