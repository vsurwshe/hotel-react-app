import Dashboard from '../dashboard/Dashboard';
import OrdersManagement from '../orders/OrdersManagement';
import StoreManagement from '../store/StoreManagement';
import TablesManagement from '../tables/TablesManagement';
import ProfileManagement from '../profile/ProfileManagement'
// import Settings from '../settings/Settings'
import InvoiceManagement from '../InvoiceManagement/InvoiceManagement';
import FoodManagement from '../foodManagement/FoodManagement';
import RoomBookingManagement from '../roomBooking/RoomBookingManagement';


export default [
    {
        icon:"nc-icon nc-bank icon-bold",
        name:"Dashboard",
        path:"/",
        component:Dashboard,
    },
    {
        icon:"nc-icon nc-paper icon-bold",
        name:"Orders",
        path:"/orders",
        component:OrdersManagement
    },
    {
        icon:"nc-icon nc-paper icon-bold",
        name:"Rooms",
        path:"/roomBooking",
        component:RoomBookingManagement
    },
    {
        icon:"nc-icon nc-paper-2 icon-bold",
        name:"Invoice",
        path:"/invoice",
        component:InvoiceManagement
    },
    {
        icon:"nc-icon nc-sun-fog-29",
        name:"Foods",
        path:"/foods",
        component:FoodManagement
    },
    {
        icon:"nc-icon nc-support-17",
        name:"Tables",
        path:"/tables",
        component:TablesManagement,
    },
    {
        icon:"nc-icon nc-shop",
        name:"Stores",
        path:"/stores",
        component:StoreManagement,
    },
    {
        icon:"nc-icon nc-circle-09",
        name:"Profile",
        path:"/profile",
        component:ProfileManagement,
    },
    // {
    //     icon:"nc-icon nc-settings",
    //     name:"Settings",
    //     path:"/settings",
    //     component:Settings,
    // }
]
