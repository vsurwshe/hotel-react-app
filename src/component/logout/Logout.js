import React from 'react';
import { connect } from 'react-redux';

const Logout=(props)=>{
    
    return <h2>Logout</h2>
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(Logout);