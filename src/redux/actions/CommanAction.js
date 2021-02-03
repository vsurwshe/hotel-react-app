import { CONSTANT_MESSAGE } from '../../assets/config/Config';

// this function will help to utlize success
const SuccessFunction=({dispatch, successFunctionCallBack, response, list})=>{
    if(list){
        return  dispatch(successFunctionCallBack(response.data && response.data.data))
    }else{
        return  dispatch(successFunctionCallBack(response.data))
    }
}

// this will help to utlize the error 
const ErrorFunction=({error,dispatch, errorFunctionCallBack})=>{
    if(error && error.response && error.response.status && error.response.status === 400){
      return  dispatch(errorFunctionCallBack(error.response.data))
    }else{ 
       return  dispatch(errorFunctionCallBack(CONSTANT_MESSAGE.ERROR_MESSAGE))
    }
}

export{
    SuccessFunction,
    ErrorFunction
}