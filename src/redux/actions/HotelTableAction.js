import { CreateInstance } from '../../assets/config/Config'

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

const saveHotelTableRecord=(hotelTableData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/api/hotelTable/save',hotelTableData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(saveHotelTableData(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const updateHotelTableRecord=(hotelTableData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .put('/api/hotelTable/update/'+hotelTableData.table_id,hotelTableData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(updateHotelTableData(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}

const deleteHotelTableRecord=(hotelTableData,authrizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .delete('/api/hotelTable/delete/'+hotelTableData.table_id,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+authrizationKey
                }
            })
            .then(response => dispatch(deleteHotelTableData(response.message)) )
            .catch(error => console.log("Error ", error))
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