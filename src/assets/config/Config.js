import Axios from "axios";
const {apiUrl}= window['runConfig'];
const API_EXE_TIME=500;
const CreateInstance=()=> {
    let instance = Axios.create({
      baseURL: apiUrl,
    });
    return instance;
}
export{
    API_EXE_TIME,
    apiUrl,
    CreateInstance
}

