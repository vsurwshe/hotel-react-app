import { CreateInstance } from '../../assets/config/Config'
import { ErrorFunction, SuccessFunction } from './CommanAction'

// this method will used for get list of food items 
const GetListOfFoodItem=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/food/list',{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack: saveFoodtemList, response, list:true}))
            .catch(error => console.log("Error ", error))
    }
}

// this method will used for save of food item record
const SaveFoodItemRecord=(foodItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/food/save',foodItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveFoodItemData, response}))
            .catch(error => ErrorFunction({dispatch, error,errorFunctionCallBack:saveFoodItemData}))
    }
}

// this method will used for update of food item record
const UpdateFoodItemRecord=(foodItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/food/update/'+foodItemData.food_id,foodItemData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:updateFoodItemData, response}))
            .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:updateFoodItemData}))
    }
}

// this method will used for delete of food item record
const DeleteStoreItemRecord=(foodItemData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/food/delete/'+foodItemData.food_id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:deleteFoodItemData, response}))
            .catch(error => ErrorFunction({error, dispatch, errorFunctionCallBack:deleteFoodItemData}))
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