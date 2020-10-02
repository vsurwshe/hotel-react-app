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
            .catch(error => {
                if(error && error.response &&error.response.status === 401){
                    dispatch(saveMessage("Please check your credtional","error"));
                }else{
                    dispatch(saveMessage("Something went worng...!","error"))
                }
            })
    }
}

const UserLogout=()=>{
    return(dispatch)=>{
        return dispatch(clearData());
    }
}

//---------------------------
export function saveAuthrozation(loginData){
    return{
        type: "SET_AUTHRIZATION",
        loginData
    }
}

export function saveMessage(message,color){
    return{
        type: "SET_LOGIN_MESSAGE",
        message,
        color
    }
}

export function clearData(){
    return{
        type:"CLEAR_DATA"
    }
}

export {
    GetLogin,
    UserLogout
}