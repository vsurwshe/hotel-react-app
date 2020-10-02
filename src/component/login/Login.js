import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { API_EXE_TIME } from '../../assets/config/Config';
import * as LoginAction from '../../redux/actions/LoginAction';
import { Alert } from '@material-ui/lab';
import Loader from '../utilites/Loader';
import './css/main.css';
import './css/util.css';
import { renderTextFiled } from '../utilites/FromUtilites';


class Login extends Component {
    state = { 
        loadLoginValue:false
    }

    handleLoginValue=()=>{this.setState({loadLoginValue: !this.state.loadLoginValue})}

    render() { 
        return this.loadLoginFrom()
    }

    loadLoginFrom=()=>{
        const { loadLoginValue }=this.state
        const { message, color}=this.props.LoginState
        return <LoginFrom 
            SaveMethod={this.callLoginApi} 
            loading={loadLoginValue}  
            message={message}
            color={color}
        />
    }

    callLoginApi=async(values)=>{
        const { GetLogin, saveMessage }=this.props.LoginAction
        await this.handleLoginValue()
        await GetLogin(values);
        setTimeout(async()=>{
            await this.handleLoginValue();
            await saveMessage("","");
        },API_EXE_TIME)
    }
}

let LoginFrom=(props)=>{
    const { SaveMethod, pristine, submitting, handleSubmit, loading, message, color } = props
    return <div className="limiter">
		<div className="container-login100" style={{backgroundImage: "url('./images/bg-01.jpg')"}}>
			<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            {(message && color && message !== "" && color !== "")&& <Alert severity={color}><h2>{message}</h2></Alert>}
                <form className="login100-form validate-form" onSubmit={handleSubmit(SaveMethod)}>
					<span className="login100-form-title p-b-49"> Login </span>
					<Field name="email" component={renderTextFiled} type="email" placeholder="Enter your email"  />
                    <Field name="password" component={renderTextFiled} type="password" placeholder="Enter your password"  />
					{loading && <Loader message="Loading" size={40} />}
                    <div className="text-right p-t-8 p-b-31"> <a href="/"> Forgot password? </a></div>
					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button type="submit" className="login100-form-btn" disabled={pristine || submitting}> Login to account </button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
}

const afterSubmit = (result, dispatch) => dispatch(reset('Login'));
LoginFrom = reduxForm({form:"Login", onSubmitSuccess: afterSubmit})(LoginFrom)

const mapStateToProps=state=>{return state;}
const mapDispatchToProps=dispatch=>({
    LoginAction: bindActionCreators(LoginAction, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);