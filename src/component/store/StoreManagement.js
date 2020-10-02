import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../utilites/Loader';
import StoreTable from './StoreTable';

class StoreManagement extends Component {
    state = { 
        loadStoreItem:false,
        fromAction:"",
        storeData:[],
        operation:""
    }

    handelLoadStoreItem=()=>{this.setState({ loadStoreItem: !this.state.loadStoreItem})}
    
    handelFromAction=(storeData, operation)=>{this.setState({fromAction: !this.state.fromAction, operation, storeData})}


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
        return <StoreTable
            fromAction={this.handelFromAction} 
        />
    }
}

const mapStateToProps=state=>{return state}
export default connect(mapStateToProps)(StoreManagement);