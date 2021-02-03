import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { API_EXE_TIME } from '../../assets/config/Config';
import * as LoginAction from '../../redux/actions/LoginAction';
import Loader from '../utilites/Loader';
import './css/loginForm2.scss';
import { renderLoginTextFiled, renderSanckBar  } from '../utilites/FromUtilites';

//this is main login component
class Login extends Component {
    state = {
        loadLoginValue: false
    }

    // this method will handel login loading value
    handleLoginValue = () => { this.setState({ loadLoginValue: !this.state.loadLoginValue }) }

    render() {
        return this.loadLoginFrom()
    }

    // this method will used for login form render
    loadLoginFrom = () => {
        const { loadLoginValue } = this.state
        const { message, color } = this.props.LoginState
        return <LoginFrom
            SaveMethod={this.callLoginApi}
            loading={loadLoginValue}
            message={message}
            color={color}
        />
    }

    // this method will used for calling login api
    callLoginApi = async (values) => {
        const { GetLogin, saveMessage } = this.props.LoginAction
        await this.handleLoginValue()
        await GetLogin(values);
        setTimeout(async () => {
            await this.handleLoginValue();
            await saveMessage("", "");
        }, API_EXE_TIME)
    }
}

// this compoent will load the login screen
let LoginFrom = (props) => {
    const { SaveMethod, pristine, submitting, handleSubmit, loading, message, color } = props
    return <div style={{paddingTop:"20%"}}>
        {(message && color && message !== "" && color !== "") && renderSanckBar({ open: (message && color && message !== "" && color !== "") ?true :false, color,message})}
        <form className="form-class" onSubmit={handleSubmit(SaveMethod)}>
            <h1>Admin Dashborad Sign-In</h1>
            <div className="inset">
                <Field name="email" component={renderLoginTextFiled} type="text1" label="EMAIL ADDRESS" placeholder="Enter your email" />
                <Field name="password" component={renderLoginTextFiled} type="password" label="PASSWORD" placeholder="Enter your password" />
            </div>
            {loading && <Loader message="" size={40} />}
            <p className="p-container">
                <input type="submit" value="Log in" style={{float:"left"}} disabled={pristine || submitting} />
                <span style={{float:"right"}}>Forgot password ?</span>
            </p>
        </form>
    </div>
}

const afterSubmit = (result, dispatch) => dispatch(reset('Login'));
LoginFrom = reduxForm({ form: "Login", onSubmitSuccess: afterSubmit })(LoginFrom)

const mapStateToProps = state => { return state; }
const mapDispatchToProps = dispatch => ({
    LoginAction: bindActionCreators(LoginAction, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);