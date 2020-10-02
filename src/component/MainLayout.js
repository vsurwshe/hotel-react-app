import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./css/Sidebar.css"
import NotFound from './NotFound/NotFound';
import Routes from './routes/Routes'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import * as LoginAction from '../redux/actions/LoginAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const MainLayout = (props) => {
  return <>
    <aside>
      {LoadSideBarIcon(props)}
      {LoadUserSetion(props)}
      {LoadNav(props)}
    </aside>
    <article>
      {LoadRouter(props)}
    </article>
  </>
}

const LoadSideBarIcon = (props) => {
  return <svg
    version="1.1"
    id="nav-btn"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title"
    xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 512 513"
    // enable-background="new 0 0 512 512" 
    space="preserve"
  >
    <path id="list-view-icon" d="M462,108.857H50V50h412V108.857z M462,167.714H50v58.857h412V167.714z M462,285.429H50v58.857h412V285.429z M462,403.143H50V462h412V403.143z" />
  </svg>
}

const LoadUserSetion = (props) => {
  return <>
    <h1>Admin</h1>
    <hr />
  </>
}

const LoadRouter = (props) => {
  return <Switch>
    {Routes.map((route, index) => { return <Route key={index} path={route.path} exact component={props => <route.component {...props} />} /> })}
    <Route component={NotFound} />
  </Switch>
}

const LoadNav = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return <nav>
    <ul>
      {Routes.map((item, key) => LoadSingleLink(item, key))}
      {CallLogOut({ handleClickOpen, open, handleClose, mainProps: props })}
      <li style={{ margin: 10, fontSize: "large", fontWeight: "bold" }}>
        <FontAwesomeIcon icon={faUserTimes} color="red" />
        <a style={{ marginLeft: 10 }} onClick={handleClickOpen}>Sign out</a>
      </li>
    </ul>
  </nav>
}

const CallLogOut = (props) => {
  const { open, handleClose } = props
  const { UserLogout } = (props.mainProps && props.mainProps.LoginAction) && props.mainProps.LoginAction
  return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogContent>
      <h4> Are sure want to log out from this account, if yes your all data will be lost ? </h4>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary"> <h5>Cancel</h5> </Button>
      {/* This user logout function declare in the login action and state action in store */}
      <Button onClick={UserLogout} color="primary"> <h5>Logout</h5> </Button>
    </DialogActions>
  </Dialog>
}


const LoadSingleLink = (item, key) => {
  return <li key={key} style={{ margin: 10, fontSize: "large", fontWeight: "bold" }}> <FontAwesomeIcon icon={item.icon} color="red" /><a href={item.path} style={{ marginLeft: 10 }} >{item.name}</a></li>
}

const mapStateToProps = state => { return state }
const mapDispatchToProps = dispatch => ({
  LoginAction: bindActionCreators(LoginAction, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);