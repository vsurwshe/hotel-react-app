import { CreateInstance } from '../../assets/config/Config'
import { ErrorFunction, SuccessFunction } from './CommanAction';

// this method get free room list
const getFreeRoomList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/list/freeRoom',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveFreeRoomList, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method get booked room list
const getBookedRoomList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/list/bookedRoom',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveBookedRoomList, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method get booked room list
const getTodayCheckoutRoomList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/list/todayCheckOutRooms',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveTodayCheckoutRoomList, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method get customer list
const getCustomerList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/list/customer',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveCustomerList, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method get customer list
const getRoomList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/list',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomList, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method save room record
const createRoomRecord=(roomRecord, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/api/room/saveRoom', roomRecord,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomData, response}))
        .catch(error => ErrorFunction({error,dispatch, errorFunctionCallBack:saveRoomData}))
    }
}

// this method get room record by id
const getRoomRecordById=(roomId, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/getDetails/'+roomId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomDataById, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method update room record by id
const updateRoomRecord=(roomId, roomData, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/api/room/updateRoom/'+roomId, roomData,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomData, response}))
        .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:saveRoomData}))
    }
}

// this method update room record by id
const deleteRoomRecord=(roomId, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/deleteRoom/'+roomId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomData, response}))
        .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:saveRoomData}))
    }
}

// this method get room record by id
const getRoomBookingRecordById=(roomBookingId, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/getBookingDetails/'+roomBookingId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomBookingDataById, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method save room booking record
const createRoomBookingRecord=(roomBookingRecord, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/api/room/saveRoomBooking', roomBookingRecord,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomBookingData, response}))
        .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:saveRoomBookingData}))
    }
}

// this method update room booking record
const updateRoomBookingRecord=(roomBookingId,roomBookingData, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/api/room/updateRoomBooking/'+roomBookingId, roomBookingData,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response =>SuccessFunction({dispatch, successFunctionCallBack:saveRoomBookingData, response}))
        .catch(error => ErrorFunction({error,dispatch,errorFunctionCallBack:saveRoomBookingData}))
    }
}

// this method delete room booking record
const deleteRoomBookingRecord=(roomBookingId, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/room/deleteRoomBooking/'+roomBookingId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveRoomBookingData, response}))
        .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:saveRoomBookingData}))
    }
}

//------------------------------------

export function saveFreeRoomList(freeRoomList) {
    return {
        type:"SAVE_FREE_ROOM_LIST",
        freeRoomList
    }
}

export function saveBookedRoomList(bookedRoomList) {
    return {
        type:"SAVE_BOOKED_ROOM_LIST",
        bookedRoomList
    }
}

export function saveTodayCheckoutRoomList(todayCheckoutRoomList) {
    return {
        type:"SAVE_TODAY_CHECKOUT_ROOM_LIST",
        todayCheckoutRoomList
    }
}

export function saveCustomerList(customerList) {
    return {
        type:"SAVE_CUSTOMER_LIST",
        customerList
    }
}

export function saveRoomList(roomList) {
    return {
        type:"SAVE_ROOM_LIST",
        roomList
    }
}


export function saveRoomData(roomData) {
    return {
        type:"SAVE_ROOM_RECORD_DATA",
        roomData
    }
}

export function saveRoomDataById(roomData) {
    return {
        type:"SAVE_ROOM_RECORD_DATA_BY_ID",
        roomData
    }
}

export function saveRoomBookingDataById(roomBookingData) {
    return {
        type:"SAVE_ROOM_BOOKING_RECORD_DATA_BY_ID",
        roomBookingData
    }
}

export function saveRoomBookingData(roomBookingData) {
    return {
        type:"SAVE_ROOM_BOOKING_RECORD_DATA",
        roomBookingData
    }
}

export{
    getFreeRoomList,
    getBookedRoomList,
    getTodayCheckoutRoomList,
    createRoomRecord,
    getRoomRecordById,
    updateRoomRecord,
    deleteRoomRecord,
    createRoomBookingRecord,
    updateRoomBookingRecord,
    deleteRoomBookingRecord,
    getCustomerList,
    getRoomList,
    getRoomBookingRecordById   
}