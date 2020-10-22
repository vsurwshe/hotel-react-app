import React from 'react';
import { TextField } from '@material-ui/core';

const renderTextFiled=({type, name, placeholder, dataValidate, input, meta: { touched, invalid, error }, ...custom})=>(
    <div className="wrap-input100 validate-input m-b-23" data-validate ={dataValidate}>
        <input 
            className="input100" 
            type={type} 
            name={name} 
            error={touched ? invalid : undefined}
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

const renderSelectFileds=({ label, name, input, placeholder, helperText, type, meta: { touched, invalid, error }, ...custom })=>(
    <select id={name} name={name} form="carform">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
    </select>
)
    
const capitalizeFirstLatter = (string) => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// this is render text filed
const renderHiddenField = ({ label, name, input, meta: { touched, invalid, error }, ...custom }) => (
    <inputs
      id={name}
      label={label}
      type="hidden"
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )
  

export{
    renderTextFiled,
    renderFromTextFiled,
    renderMATextField,
    renderPaperTextFiled,
    capitalizeFirstLatter,
    renderHiddenField,
    renderSelectFileds
}