import { CreateInstance } from '../../assets/config/Config'

const getBookTableList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/orders/table/bookedTabelList',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveBookTableList(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
    }
}

const getFreeTableList=(authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/orders/table/freeTabelList',{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveFreeTabelList(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
    }
}

const createBookTabelRecord=(tabelRecord, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/orders/table/save', tabelRecord,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveBookTabelRecord(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
    }
}

const deleteBookTabelRecord=(tabelRecordId, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .delete('/orders/table/delete/'+tabelRecordId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveDeleteBookTabelRecord(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
    }
}

const createOrderTabelRecord=(orderRecord, authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .post('/orders/food/save', orderRecord,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveOrderTabelRecord(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
    }
}

const getOrderFoodListByTableId=(bookedTableId,authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .get('/orders/food/list/'+bookedTableId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveOrderFoodListByTableId(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
    }
}

const updateOrderFood=(foodData,authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .put('/orders/food/update/'+foodData.order_food_id,foodData,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveOrderFoodRecord(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
    }
}

const deleteOrderFood=(foodId,authrizationKey)=>{
    return (dispatch)=>{
        return CreateInstance()
        .delete('/orders/food/delete/'+foodId,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+authrizationKey
            }
        })
        .then(response => dispatch(saveDeleteFoodRecord(response.data && response.data.data)) )
        .catch(error => console.log("Error ", error))
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

export function saveDeleteBookTabelRecord(tabelData) {
    return {
        type:"SAVE_DELTE_BOOK_TABEL_RECORD",
        tabelData
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
