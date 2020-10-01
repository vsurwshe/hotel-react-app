import React from 'react';
import { CircularProgress } from "@material-ui/core"
const Loader=(props)=>{
    const { message, size}= props
    return <center>
        <h3>{message}</h3> 
        <CircularProgress size={size} />
    </center>
}
export default Loader;