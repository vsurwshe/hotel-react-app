import React from 'react';
import { connect } from 'react-redux';
import Login from './component/login/Login';
import MainLayout from './component/MainLayout';

const App=(props)=>{
  const {authrizations }=props.LoginState
  return (authrizations && authrizations !=="") ? <MainLayout />: <Login />
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(App);
