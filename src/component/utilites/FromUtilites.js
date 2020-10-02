import React from 'react';

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

export{
    renderTextFiled
}