const initialState={
    listOfFreeTabels:[],
    listOfBookedTabels:[],
    orderFoodList:[],
    bookTabelData:[],
    orderData:[],
    bookedTabelFoodList:[],
    dummyData:[]
}

const MainOrdersState=(state=initialState, action)=>{
    switch (action && action.type) {
        case "BOOK_TABEL":
            let tempBookTable= action.tableData && action.tableData.bookedTables; 
            let tempOrderFoodList= action.tableData && action.tableData.OrderFoodResult;
            return {...state, listOfBookedTabels:tempBookTable, orderFoodList:tempOrderFoodList}
        case "LIST_FREE_TABEL":
            return {...state, listOfFreeTabels:action.tableData}
        case "SAVE_BOOK_TABEL_RECORD":
            return {...state, bookTabelData:action.tableData}
        case "SAVE_DELETE_BOOK_TABEL_RECORD":
            return {...state, dummyData:action.deleteMessage}
        case "SAVE_ORDER_TABEL_RECORD":
            return {...state, orderData:action.orderData.foodData, dummyData:{message:action.orderData.message}}
        case "SAVE_ORDER_FOOD_LIST_BY_TABEL_ID":
            return {...state, bookedTabelFoodList:action.foodData}
        case "SAVE_UPDATE_ORDER_FOOD_RECORD":
            return {...state, orderData:action.foodData.data,dummyData:{message:action.foodData.message}}
        case "SAVE_DELETE_ORDER_FOOD_RECORD":
            return {...state, dummyData:action.foodData}
        case "HANDLE_ERROR_ORDER_FOOD_RECORD":
            return {...state, dummyData:action.deleteMessage}
        default:
            return state;
    }
}

export default MainOrdersState;