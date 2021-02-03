import { CreateInstance } from '../../assets/config/Config'
import { ErrorFunction, SuccessFunction } from './CommanAction'

// this method will get list of store items
const GetListOfStoreItem=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/store/getAllStoreProduct',{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch,successFunctionCallBack:saveStoreItemList, response, list:true }))
            .catch(error => console.log("Error ", error))
    }
}

// this method will save store item record
const saveStoreItemRecord=(storeItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/store/saveStoreProduct',storeItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveStoreItemData, response}))
            .catch(error => ErrorFunction({dispatch, error, errorFunctionCallBack:saveStoreItemData}))
    }
}

// this method will update store item
const updateStoreItemRecord=(storeItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/store/updateStoreProduct/'+storeItemData.store_id,storeItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:updateStoreItemData, response}))
            .catch(error => ErrorFunction({dispatch,error, errorFunctionCallBack:updateStoreItemData}))
    }
}

// this method will delete store item record
const deleteStoreItemRecord=(storeItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/store/deleteStoreProduct/'+storeItemData.store_id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:deleteStoreItemData, response}))
            .catch(error =>ErrorFunction({dispatch, error, errorFunctionCallBack:deleteStoreItemData}))
    }
}



//-------------------------
export function saveStoreItemList(storeItemList){
    return{
        type:"SAVE_STORE_ITEM_LIST",
        storeItemList
    }
}

export function saveStoreItemData(storeItemData){
    return{
        type:"SAVE_STORE_ITEM_DATA",
        storeItemData
    }
}

export function updateStoreItemData(storeItemData){
    return{
        type:"UPDATE_STORE_ITEM_DATA",
        storeItemData
    }
}

export function deleteStoreItemData(deleteMessage){
    return{
        type:"DELETE_STORE_ITEM_DATA",
        deleteMessage
    }
}

export {
    GetListOfStoreItem,
    saveStoreItemRecord,
    updateStoreItemRecord,
    deleteStoreItemRecord
}