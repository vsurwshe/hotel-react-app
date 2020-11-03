import Dashboard from '../dashboard/Dashboard';
import OrdersManagement from '../orders/OrdersManagement';
import StoreManagement from '../store/StoreManagement';
import TablesManagement from '../tables/TablesManagement';
import ProductsManagement from '../products/ProductsManagement';
import ProfileManagement from '../profile/ProfileManagement'
import Settings from '../settings/Settings'
import InvoiceManagement from '../InvoiceManagement/InvoiceManagement';


export default [
    {
        icon:"nc-icon nc-diamond",
        name:"Dashboard",
        path:"/",
        component:Dashboard,
    },
    {
        icon:"nc-icon nc-paper",
        name:"Orders",
        path:"/orders",
        component:OrdersManagement
    },
    {
        icon:"nc-icon nc-single-02",
        name:"Invoice",
        path:"/invoice",
        component:InvoiceManagement
    },
    {
        icon:"nc-icon nc-shop",
        name:"Stores",
        path:"/stores",
        component:StoreManagement,
    },
    {
        icon:"nc-icon nc-app",
        name:"Tables",
        path:"/tables",
        component:TablesManagement,
    },
    {
        icon:"nc-icon nc-bag-16",
        name:"Products",
        path:"/products",
        component:ProductsManagement
    },
    {
        icon:"nc-icon nc-alert-circle-i",
        name:"Profile",
        path:"/profile",
        component:ProfileManagement,
    },
    {
        icon:"nc-icon nc-settings",
        name:"Settings",
        path:"/settings",
        component:Settings,
    }
]
