import React from 'react';
import './css/profile.css'
import { connect } from 'react-redux';

const ProfileForm=(props)=>{
    const { userDetails }=props.LoginState
    if(Object.keys(userDetails).length >2){
        const { name, mobile_number, email, company_name, company_address}=userDetails
        return <div className="card1">
            <img src="img/user.png" alt={name} style={{width:"80%"}} />
            <h3>{name}</h3>
            <p className="title">CEO & Founder</p>
            <p><b>{company_name}</b></p>
            <p><b>Email:</b>{email}</p>
            <p><b>Contact:</b>{mobile_number}</p>
            <p><b>Address:</b>{company_address}</p>
            <div style={{margin: "24px 0"}}>
              <a href="/"><i className="fa fa-dribbble"></i></a>&nbsp; 
              <a href="/"><i className="fa fa-twitter"></i></a>&nbsp;  
              <a href="/"><i className="fa fa-linkedin"></i></a>&nbsp;  
              <a href="/"><i className="fa fa-facebook"></i></a>&nbsp; 
            </div>
        </div>
    }else{
        return <h3>No Profile assigned for this account</h3>
    }   
}
const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(ProfileForm);