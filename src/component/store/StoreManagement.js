import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../utilites/Loader';

class StoreManagement extends Component {
    state = { 
        loadStoreItem:false,
        fromAction:"",
        storeData:[],
        operation:""
    }

    handelLoadStoreItem=()=>{this.setState({ loadStoreItem: !this.state.loadStoreItem})}
    
    handelFromAction=(operation, fromAction)=>{this.setState({fromAction: !this.state.fromAction, operation})}


    render() { 
        const { fromAction }= this.state
        return fromAction ? this.loadStoreForm(): this.loadStoreTable();
    }

    loadStoreForm=()=>{
        return <h2>Store From</h2>
    }

    loadStoreTable=()=>{
        const { loadStoreItem }=this.state
        return loadStoreItem ? <Loader /> : this.loadingStoreTable()
    }

    loadingStoreTable=()=>{
        return <h2>Store Table</h2>
    }
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(StoreManagement);