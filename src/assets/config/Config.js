import Axios from "axios";
const {apiUrl}= window['runConfig'];
const API_EXE_TIME=500;

const CreateInstance=()=> {
    let instance = Axios.create({
      baseURL: apiUrl,
    });
    return instance;
}

const FromActions={
  "CR":"CREATE",
  "VI": "VIEW",
  "ED":"EDIT",
  "DE":"DELETE",
  "VIED":"VIEWEDIT"
}

const CONSTANT_MESSAGE={
  ERROR_MESSAGE:"Something went wrong, Please try again some after Time...!"
}

const HeaderConfig=(authrizationKey)=>{
  return {
    headers:{
      "Content-Type":"application/json",
      "Authorization": "Bearer "+authrizationKey
    }
  }
}

export{
    API_EXE_TIME,
    CONSTANT_MESSAGE,
    apiUrl,
    CreateInstance,
    FromActions,
    HeaderConfig
}

