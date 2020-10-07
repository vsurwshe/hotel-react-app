import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./css/Sidebar.css"
import NotFound from './NotFound/NotFound';
import Routes from './routes/Routes'
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import * as LoginAction from '../redux/actions/LoginAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const MainLayout = (props) => {
    return  <div className="wrapper ">
        {LoadNav(props)}
        {LoadRouter(props)}
    </div>
}

const LoadRouter = (props) => {
  return <div className="main-panel">
    <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
      {navbarWrapper()}
    </nav>
    <div className="content">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              {Routes.map((route, index) => { return <Route key={index} path={route.path} exact component={route.component} /> })}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
     </div>   
  </div>
}

const navbarWrapper =(props)=>{
  return  <div className="container-fluid">
  <div className="navbar-wrapper">
    <div className="navbar-toggle">
      <button type="button" className="navbar-toggler">
        <span className="navbar-toggler-bar bar1"></span>
        <span className="navbar-toggler-bar bar2"></span>
        <span className="navbar-toggler-bar bar3"></span>
      </button>
    </div>
    <a className="navbar-brand" href="/">HMS Software</a>
  </div>
   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-bar navbar-kebab"></span>
   <span className="navbar-toggler-bar navbar-kebab"></span>
   <span className="navbar-toggler-bar navbar-kebab"></span>
 </button>
 </div>

}
const LoadNav = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return <>
  <div className="sidebar" data-color="white" data-active-color="danger">
  <div className="logo">
    <a href="/" className="simple-text logo-mini"> <div className="logo-image-small"> <img src="img/logo-small.png" /> </div>
    </a>
    <a href="/" className="simple-text logo-normal">Admin</a>
  </div>
  <div className="sidebar-wrapper">
    <ul className="nav">
      {Routes.map((item, key) => LoadSingleLink(item, key))}
      {CallLogOut({ handleClickOpen, open, handleClose, mainProps: props })}
      <li> <a onClick={handleClickOpen} > <i className="nc-icon nc-button-power" /> Sing Out </a> </li>
    </ul>
  </div>
</div>
</>
}

const CallLogOut = (props) => {
  const { open, handleClose } = props
  const { UserLogout } = (props.mainProps && props.mainProps.LoginAction) && props.mainProps.LoginAction
  return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogContent>
      <p> Are sure want to log out from this account, if yes your all data will be lost ? </p>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary"> Cancel</Button>
      {/* This user logout function declare in the login action and state action in store */}
      <Button onClick={UserLogout} color="primary"> Logout</Button>
    </DialogActions>
  </Dialog>
}


const LoadSingleLink = (item, key) => {
  return <li key={key}>
    <a href={item.path}>
      <i className={item.icon} />
      {item.name}
    </a>
  </li>
}

const mapStateToProps = state => { return state }
const mapDispatchToProps = dispatch => ({
  LoginAction: bindActionCreators(LoginAction, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);