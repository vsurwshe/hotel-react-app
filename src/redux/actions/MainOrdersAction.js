import { CreateInstance } from '../../assets/config/Config'
import { ErrorFunction, SuccessFunction } from './CommanAction'

// this method get list of booked table
const getBookTableList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/orders/table/bookedTabelList',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveBookTableList, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method get list of free table
const getFreeTableList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/orders/table/freeTabelList',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveFreeTabelList, response, list:true}))
        .catch(error => console.log("Error ", error))
    }
}

// this method will save table record
const createBookTabelRecord=(tabelRecord, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/api/orders/table/save', tabelRecord,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveBookTabelRecord, response}))
        .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:handelErrorMessage}))
    }
}

// this method delete table record
const deleteBookTabelRecord=(tabelRecordId, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/orders/table/delete/'+tabelRecordId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveDeleteBookTabelRecord, response}))
        .catch(error => ErrorFunction({error,dispatch,errorFunctionCallBack:handelErrorMessage}))
    }
}

// this method save order table
const createOrderTabelRecord=(orderRecord, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/api/orders/food/save', orderRecord,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveOrderTabelRecord, response}))
        .catch(error => ErrorFunction({dispatch, error, errorFunctionCallBack:handelErrorMessage}))
    }
}

// this method get orered food list by table id
const getOrderFoodListByTableId=(bookedTableId,authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/orders/food/list/'+bookedTableId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveOrderFoodListByTableId, response, list:true}))
        .catch(error => ErrorFunction({error, dispatch,errorFunctionCallBack: handelErrorMessage}))
    }
}

// this method will update order food record
const updateOrderFood=(foodData,authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/api/orders/food/update/'+foodData.order_food_id,foodData,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveOrderFoodRecord, response}))
        .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:handelErrorMessage}))
    }
}

// this method delete order food record
const deleteOrderFood=(foodId,authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/api/orders/food/delete/'+foodId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveDeleteFoodRecord, response}))
        .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:handelErrorMessage}))
    }
}

//------------------------
export function saveBookTableList(tableData){
    return{
        type:"BOOK_TABEL",
        tableData
    }
}

export function saveFreeTabelList(tableData){
    return{
        type:"LIST_FREE_TABEL",
        tableData
    }
}

export function saveBookTabelRecord(tabelData) {
    return {
        type:"SAVE_BOOK_TABEL_RECORD",
        tabelData
    }
}

export function saveDeleteBookTabelRecord(deleteMessage) {
    return {
        type:"SAVE_DELETE_BOOK_TABEL_RECORD",
        deleteMessage
    }
}

export function saveOrderTabelRecord(orderData) {
    return {
        type:"SAVE_ORDER_TABEL_RECORD",
        orderData
    }
}

export function saveOrderFoodListByTableId(foodData) {
    return{
        type:"SAVE_ORDER_FOOD_LIST_BY_TABEL_ID",
        foodData
    }
}

export function saveOrderFoodRecord(foodData) {
    return {
        type:"SAVE_UPDATE_ORDER_FOOD_RECORD",
        foodData
    }
}

export function saveDeleteFoodRecord(foodData) {
    return {
        type:"SAVE_DELETE_ORDER_FOOD_RECORD",
        foodData
    }
}

export function handelErrorMessage(message) {
    return {
        type:"HANDLE_ERROR_ORDER_FOOD_RECORD",
        message
    }
}

export{
    getBookTableList,
    getFreeTableList,
    createBookTabelRecord,
    createOrderTabelRecord,
    getOrderFoodListByTableId,
    updateOrderFood,
    deleteOrderFood,
    deleteBookTabelRecord
}
