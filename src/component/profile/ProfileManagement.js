import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StoreAction from '../../redux/actions/StoreAction'
import ProfileForm from './ProfileForm';
class ProfileManagement extends Component {
    state = { 
        loadingProfileForm:false
    }
    render() {
        return <ProfileForm />
    }


}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    StoreAction:bindActionCreators(StoreAction, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfileManagement);