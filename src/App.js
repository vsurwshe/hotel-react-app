import React from 'react';
import { connect } from 'react-redux';
import MainLayout from './component/MainLayout';

const App=()=>{
  return <>
  <MainLayout />
  </>
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(App);
