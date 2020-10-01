import { CreateInstance } from '../../assets/config/Config'
const GetLogin=(loginData)=>{
    return(dispatch)=>{
        return CreateInstance()
            .post('/auth/login',loginData,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response => dispatch(saveAuthrozation(response.data)) )
            .catch(error => console.log("Error ", error))
    }
}
//---------------------------
export function saveAuthrozation(loginData){
    return{
        type: "SET_AUTHRIZATION",
        loginData
    }
}

export {
    GetLogin
}