const initialState={
    authrizations:"",
    username:""
}

const LoginState=(state=initialState,action)=>{
    switch (action && action.type) {
        case "SET_AUTHRIZATION":
            return {...state, authrizations: action.loginData}
        default:
            return state;
    }
}

export default LoginState;