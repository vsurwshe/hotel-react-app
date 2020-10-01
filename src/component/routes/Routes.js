import Dashboard from '../dashboard/Dashboard';
import OrdersManagement from '../orders/OrdersManagement';
import UsersManagement from '../users/UsersManagement';
import GroupsManagement from '../groups/GroupsManagement';
import StoreManagement from '../store/StoreManagement';
import TablesManagement from '../tables/TablesManagement';
import ProductsManagement from '../products/ProductsManagement';
import ProfileManagement from '../profile/ProfileManagement'
import Settings from '../settings/Settings'
import Logout from '../logout/Logout';
import { faHome, faBookOpen, faUser, faUsers, faStore, faTable, faCookie, faUserAlt, faSun, faUserTimes } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        icon:faHome,
        name:"Dashboard",
        path:"/",
        component:Dashboard,
    },
    {
        icon:faBookOpen,
        name:"Orders",
        path:"/orders",
        component:OrdersManagement,
        downArrow:"fas fa-caret-down",
        child:[
            {name:"Manage Orders", path:"/orders/manageUser", component:{}}
        ]
    },
    {
        icon:faUser,
        name:"Users",
        path:"/users",
        component:UsersManagement,
        downArrow:"fas fa-caret-down",
        child:[
            {name:"Manage Users", path:"/users/manageUser", component:{}}
        ]
    },
    {
        icon:faUsers,
        name:"Groups",
        path:"/groups",
        component:GroupsManagement,
        downArrow:"fas fa-caret-down",
        child:[
            {name:"Manage Groups", path:"/groups/manageGroup", component:{}},
        ]
    },
    {
        icon:faStore,
        name:"Stores",
        path:"/stores",
        component:StoreManagement,
    },
    {
        icon:faTable,
        name:"Tables",
        path:"/tables",
        component:TablesManagement,
    },
    {
        icon:faCookie,
        name:"Products",
        path:"/products",
        component:ProductsManagement,
        downArrow:"fas fa-caret-down",
        child:[
            {name:"Add Products", path:"/products/addProducts", component:{}},
            {name:"Manage Products", path:"/products/manageProducts", component:{}}
        ]
    },
    {
        icon:faUserAlt,
        name:"Profile",
        path:"/profile",
        component:ProfileManagement,
    },
    {
        icon:faSun,
        name:"Settings",
        path:"/settings",
        component:Settings,
    },
    {
        icon:faUserTimes,
        name:"Logout",
        path:"/logout",
        component:Logout,
    }
]
