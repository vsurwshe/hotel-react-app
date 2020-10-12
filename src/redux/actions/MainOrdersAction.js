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


export{
    getBookTableList,
    getFreeTableList,
    createBookTabelRecord
}
