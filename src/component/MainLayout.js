import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./css/Sidebar.css"
import NotFound from './NotFound/NotFound';
import Routes from './routes/Routes'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const LoadSideBarIcon=(props)=>{
  return <svg
  version="1.1"
  id="nav-btn"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 32 32" aria-labelledby="title"
  xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 512 512"
  // enable-background="new 0 0 512 512" 
  space="preserve"
>
  <path id="list-view-icon" d="M462,108.857H50V50h412V108.857z M462,167.714H50v58.857h412V167.714z M462,285.429H50v58.857h412V285.429z M462,403.143H50V462h412V403.143z" />
</svg>
}

const LoadUserSetion=(props)=>{
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
  return <nav>
    <ul> {Routes.map((item, key) => LoadSingleLink(item, key))} </ul>
  </nav>
}

const LoadSingleLink = (item, key) => {
  return <li key={key} style={{margin:10, fontSize:"large", fontWeight:"bold"}}> <FontAwesomeIcon icon={item.icon} color="red" /><a href={item.path}style={{marginLeft: 10}} >{item.name}</a></li>
}

export default MainLayout;