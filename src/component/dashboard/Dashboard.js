import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginAction from '../../redux/actions/LoginAction'

class Dashboard extends Component {
    state = {  }
    componentDidMount=async()=>{
        const {GetLogin }=this.props.LoginAction
        const { authrizations }=this.props.LoginState
        if(authrizations === ""){
            await GetLogin({
                "email":"v@v.com",
                "password":"admin@123"
            });
        }
        
    }
    render() { 
        return <h2>Dashboard</h2>
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToPorps=dispatch=>({
    LoginAction : bindActionCreators(LoginAction, dispatch)
})
export default connect(mapStateToProps,mapDispatchToPorps)(Dashboard);