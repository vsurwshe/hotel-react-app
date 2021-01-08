import { CreateInstance } from '../../assets/config/Config'

const GetListOfFoodItem=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/food/list',{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(saveFoodtemList(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const SaveFoodItemRecord=(foodItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/food/save',foodItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(saveFoodItemData(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const UpdateFoodItemRecord=(foodItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .put('/api/food/update/'+foodItemData.food_id,foodItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(updateFoodItemData(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const DeleteStoreItemRecord=(foodItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .delete('/api/food/delete/'+foodItemData.food_id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(deleteFoodItemData(response.message)) )
            .catch(error => console.log("Error ", error))
    }
}



//-------------------------
export function saveFoodtemList(foodItemList){
    return{
        type:"SAVE_FOOD_ITEM_LIST",
        foodItemList
    }
}

export function saveFoodItemData(foodItemData){
    return{
        type:"SAVE_FOOD_ITEM_DATA",
        foodItemData
    }
}

export function updateFoodItemData(foodItemData){
    return{
        type:"UPDATE_FOOD_ITEM_DATA",
        foodItemData
    }
}

export function deleteFoodItemData(deleteMessage){
    return{
        type:"DELETE_FOOD_ITEM_DATA",
        deleteMessage
    }
}

export {
    GetListOfFoodItem,
    SaveFoodItemRecord,
    UpdateFoodItemRecord,
    DeleteStoreItemRecord   
}