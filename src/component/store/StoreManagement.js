import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../utilites/Loader';
import StoreTable from './StoreTable';
import * as StoreAction from '../../redux/actions/StoreAction'
import { bindActionCreators } from 'redux';
import StoreFrom from './StoreFrom';
import { API_EXE_TIME } from '../../assets/config/Config';
class StoreManagement extends Component {
    state = { 
        loadStoreItem:false,
        fromAction:false,
        storeData:[],
        operation:""
    }

    componentDidMount=async()=>{
        const { authrizations }= this.props.LoginState
        const { listOfStoreItem }= this.props.LoginState
        const { GetListOfStoreItem}=this.props.StoreAction
        await this.handelLoadStoreItem();
        (listOfStoreItem && listOfStoreItem<=0) && await GetListOfStoreItem(authrizations);
        await this.handelLoadStoreItem();
    }

    handelLoadStoreItem=()=>{this.setState({ loadStoreItem: !this.state.loadStoreItem})}
    
    handelFromAction=(storeData, operation)=>{ this.setState({fromAction: !this.state.fromAction, operation, storeData}) }

    render() { 
        const { fromAction, storeData }= this.state
        return fromAction ? this.loadStoreForm(storeData): this.loadStoreTable();
    }

    loadStoreForm=(storeData)=>{
        return <StoreFrom 
            SaveMethod={this.callSaveStoreApi}
            cancel={this.handelFromAction}
            storeData={storeData}
        />
    }

    loadStoreTable=()=>{
        const { loadStoreItem }=this.state
        return loadStoreItem ? <Loader /> : this.loadingStoreTable()
    }

    loadingStoreTable=()=>{
        return <StoreTable
            storeFromAction={this.handelFromAction} 
        />
    }

    callSaveStoreApi=async(props)=>{
        const { data, setLoading}=props
        const { authrizations }= this.props.LoginState
        const { GetListOfStoreItem, saveStoreItemRecord}=this.props.StoreAction
        await setLoading(true);
        await saveStoreItemRecord(data, authrizations);
        setTimeout(async()=>{
            await GetListOfStoreItem(authrizations);
            await setLoading(false);
            await this.handelFromAction();
        },API_EXE_TIME)
    }
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    StoreAction:bindActionCreators(StoreAction, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(StoreManagement);