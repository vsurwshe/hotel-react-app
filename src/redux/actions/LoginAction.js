import { CreateInstance } from "../../config/APIConfig"

const GetUserList=()=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/employee/employee.php ',{
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
    GetUserList
}