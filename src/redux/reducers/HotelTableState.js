const initialState={
    listOfHotelTable:[],
    hotelTableData:[],
    message:"",
    color:""
}

const HotelTableState=(state=initialState,action)=>{
    switch (action && action.type) {
        case "SAVE_HOTEL_TABLE_LIST":
            return{...state, listOfHotelTable:action.hotelTabelList}
        case "SAVE_HOTEL_TABLE_DATA":
            return{...state, hotelTableData:action.hotelTableData}
        case "UPDATE_HOTEL_TABLE_DATA":
            return{...state, hotelTableData:action.hotelTableData}
        case "DELETE_HOTEL_TABLE_DATA":
            return{...state, hotelTableData:action.message}
        default:
            return state;
    }
}

export default HotelTableState;