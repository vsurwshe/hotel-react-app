import React from 'react';
import { TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// this compoent rendering text filed
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

// this compoent rendering text filed on login screen
const renderLoginTextFiled=({type, name, placeholder, dataValidate, label, input, meta: { touched, invalid, error }, ...custom})=>(
    <p>
        <label htmlFor={name}>{label}</label>
        <input 
            id={name}
            type={type} 
            name={name} 
            error={touched ? invalid : undefined}
            placeholder={placeholder} 
            {...input}
            {...custom}
        />
    </p>
)

// this compoent rendering text filed form 
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

// this compoent rendering text filed mat compoent
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

// this compoent rendering text filed paper compoent
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

// this compoent rendering select filed
const renderSelectFileds=({ label, name, input, placeholder, helperText, type, meta: { touched, invalid, error }, ...custom })=>(
    <select id={name} name={name} form="carform">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
    </select>
)

// this compoent rendering capitlize first latter
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

// this compoent render sanck bar
const renderSanckBar=({open, color, message})=>(
  <Snackbar open={open} autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <Alert severity={color}> {message} </Alert>
  </Snackbar>
)
// this is alert function used in above render sanck bar compoent
function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

// this method will used for the download the invoice table as pdf
const dwonloadInvoice = (docId) => {
    let htmlTable = document.getElementById(docId);
    html2canvas(htmlTable, {
        allowTaint: true,
        backgroundColor: "rgba(255, 255, 255, 1)",
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 25, 70);
        pdf.save("downloadInvoice.pdf");
    });
}

// this will return object or not
const checkIsObject=(data)=>{
    return data && typeof data === 'object' && data.constructor === Object;
}
  

export{
    renderTextFiled,
    renderFromTextFiled,
    renderMATextField,
    renderPaperTextFiled,
    capitalizeFirstLatter,
    renderHiddenField,
    renderSelectFileds,
    renderLoginTextFiled,
    renderSanckBar,
    dwonloadInvoice,
    checkIsObject
}