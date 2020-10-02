import { CreateInstance } from '../../assets/config/Config'

const GetListOfStoreItem=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/store/list',{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(saveStoreItemList(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const saveStoreItemRecord=(storeItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/store/save',storeItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(saveStoreItemData(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const updateStoreItemRecord=(storeItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .put('/store/save/'+storeItemData.store_id,storeItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(updateStoreItemData(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const deleteStoreItemRecord=(storeItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .delete('/store/save/'+storeItemData.store_id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(deleteStoreItemData(response.message)) )
            .catch(error => console.log("Error ", error))
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