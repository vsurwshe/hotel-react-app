import { CreateInstance } from '../../assets/config/Config'
import { ErrorFunction, SuccessFunction } from './CommanAction'

// this method will get list of hotel table
const getListOfHotelTable=(authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/hotelTable/list',{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(saveHotelTableList(response.data && response.data.data)) )
            .catch(error => console.log("Error ", error))
    }
}

// this method will save hotel table record
const saveHotelTableRecord=(hotelTableData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/hotelTable/save',hotelTableData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:saveHotelTableData, response}))
            .catch(error => ErrorFunction({error,dispatch, errorFunctionCallBack:saveHotelTableData }))
    }
}

// this method will update hotel table record
const updateHotelTableRecord=(hotelTableData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/hotelTable/update/'+hotelTableData.table_id,hotelTableData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:updateHotelTableData, response}))
            .catch(error => ErrorFunction({error,dispatch, errorFunctionCallBack:updateHotelTableData }))
    }
}

// this method will delete hotel table record
const deleteHotelTableRecord=(hotelTableData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/api/hotelTable/delete/'+hotelTableData.table_id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => SuccessFunction({dispatch, successFunctionCallBack:deleteHotelTableData, response}))
            .catch(error => ErrorFunction({error,dispatch, errorFunctionCallBack:deleteHotelTableData }))
    }
}

//-----------------------

export function saveHotelTableList(hotelTabelList) {
    return{
        type:"SAVE_HOTEL_TABLE_LIST",
        hotelTabelList
    }
}

export function saveHotelTableData(hotelTableData) {
    return{
        type:"SAVE_HOTEL_TABLE_DATA",
        hotelTableData
    }    
}

export function updateHotelTableData(hotelTableData) {
    return{
        type:"UPDATE_HOTEL_TABLE_DATA",
        hotelTableData
    }
}

export function deleteHotelTableData(message) {
    return{
        type:"DELETE_HOTEL_TABLE_DATA",
        message
    }
}

export{
    getListOfHotelTable,
    saveHotelTableRecord,
    updateHotelTableRecord,
    deleteHotelTableRecord
}