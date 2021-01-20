import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../utilites/Loader';
import StoreTable from './StoreTable';
import * as StoreAction from '../../redux/actions/StoreAction'
import { bindActionCreators } from 'redux';
import StoreFrom from './StoreFrom';
import { API_EXE_TIME, CONSTANT_MESSAGE, FromActions } from '../../assets/config/Config';
import { checkIsObject, renderSanckBar } from '../utilites/FromUtilites';
class StoreManagement extends Component {
    state = { 
        loadStoreItem:false,
        fromAction:false,
        storeData:[],
        operation:""
    }

    componentDidMount=async()=>{
        const { authrizations }= this.props.LoginState
        const { listOfStoreItem }= this.props.StoreState
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
        const { operation }=this.state
        const { storeItemData }=this.props.StoreState
        const { message}=storeItemData
        return<> 
        {!Array.isArray(storeItemData) &&((message && checkIsObject(message)) ? renderSanckBar({open:true, message:CONSTANT_MESSAGE.ERROR_MESSAGE, color:"error"}):renderSanckBar({open:true, message:message, color:"success"}))}
        <StoreFrom 
            SaveMethod={this.callStoreApi}
            cancel={this.handelFromAction}
            initialValues={storeData}
            operation={operation}
        />
        </>
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

    callStoreApi=async(props)=>{
        const { data, setLoading, operation}=props
        const { authrizations }= this.props.LoginState
        const { GetListOfStoreItem, saveStoreItemRecord, updateStoreItemRecord, deleteStoreItemRecord, saveStoreItemData}=this.props.StoreAction
        await setLoading(true);
        if(operation === FromActions.CR){
            await saveStoreItemRecord(data, authrizations);
        }else if(operation === FromActions.ED){
            delete data["updated_at"]
            delete data["created_at"]
            await updateStoreItemRecord(data, authrizations);
        }else if(operation === FromActions.DE){
            await deleteStoreItemRecord(data, authrizations);
        }
        setTimeout(async()=>{
            await GetListOfStoreItem(authrizations);
            await saveStoreItemData([]);
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