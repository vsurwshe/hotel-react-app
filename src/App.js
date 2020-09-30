import React from 'react';
import { connect } from 'react-redux';

const App=()=>{
  return <h1>App</h1>
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(App);
