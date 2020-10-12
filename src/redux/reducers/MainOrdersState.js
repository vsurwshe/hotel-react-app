const initialState={
    listOfFreeTabels:[],
    listOfBookedTabels:[],
    orderFoodList:[],
    bookTabelData:[]
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
        default:
            return state;
    }
}

export default MainOrdersState;