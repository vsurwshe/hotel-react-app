const initialState={
    listOfFreeRoom:[],
    listOfBookedRoom:[],
    listOfTodayCheckoutRoom:[],
    roomData:[],
    roomDataById:[],
    roomBookingData:[],
    customerList:[],
    roomList:[],
    message:""
}

const RoomBookingState=(state=initialState, action)=>{
    switch (action && action.type) {
        case "SAVE_FREE_ROOM_LIST":
            return {...state, listOfFreeRoom: action.freeRoomList}
        case "SAVE_BOOKED_ROOM_LIST":
            return {...state, listOfBookedRoom: action.bookedRoomList}
        case "SAVE_TODAY_CHECKOUT_ROOM_LIST":
            return {...state, listOfTodayCheckoutRoom: action.todayCheckoutRoomList}
        case "SAVE_CUSTOMER_LIST":
            return {...state, customerList: action.customerList}
        case "SAVE_ROOM_LIST":
            return {...state, roomList: action.roomList}
        case "SAVE_ROOM_RECORD_DATA":
            return {...state, roomData: action.roomData}
        case "SAVE_ROOM_RECORD_DATA_BY_ID":
            return {...state, roomDataById: action.roomData}
        case "SAVE_ROOM_BOOKING_RECORD_DATA":
            return {...state, roomBookingData: action.roomBookingData}
        default:
            return state;
    }
}

export default RoomBookingState;