import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
import * as FoodAction from '../../redux/actions/FoodAction'
import Loader from '../utilites/Loader';
import FoodForm from './FoodForm';
import FoodTabel from './FoodTable'

class FoodManagement extends Component {
    state = { 
        loadFoodItem:false,
        fromAction:false,
        foodData:[],
        operation:""
    }

    componentDidMount=async()=>{
        const { authrizations }= this.props.LoginState
        const { listOfFoodsItem }= this.props.FoodState
        const { GetListOfFoodItem}=this.props.FoodAction
        await this.handelLoadFoodItem();
        (listOfFoodsItem && listOfFoodsItem<=0) && await GetListOfFoodItem(authrizations);
        await this.handelLoadFoodItem();
    }

    handelLoadFoodItem=()=>{this.setState({ loadFoodItem: !this.state.loadFoodItem})}
    
    handelFromAction=(foodData, operation)=>{ this.setState({fromAction: !this.state.fromAction, operation, foodData}) }

    render() { 
        const { fromAction, foodData }= this.state
        return fromAction ? this.loadFoodForm(foodData): this.loadFoodTable();
    }

    loadFoodForm=(storeData)=>{
        const { operation }=this.state
        return <FoodForm
            SaveMethod={this.callStoreApi}
            cancel={this.handelFromAction}
            initialValues={storeData}
            operation={operation}
        />
    }

    loadFoodTable=()=>{
        const { loadFoodItem }=this.state
        return loadFoodItem ? <Loader /> : this.loadingFoodTable()
    }

    loadingFoodTable=()=>{
        return <FoodTabel foodFromAction={this.handelFromAction}  />
    }

    callStoreApi=async(props)=>{
        const { data, setLoading, operation}=props
        const { authrizations }= this.props.LoginState
        const { GetListOfFoodItem, SaveFoodItemRecord, UpdateFoodItemRecord, DeleteStoreItemRecord}=this.props.FoodAction
        await setLoading(true);
        if(operation === FromActions.CR){
            await SaveFoodItemRecord(data, authrizations);
        }else if(operation === FromActions.ED){
            delete data["updated_at"]
            delete data["created_at"]
            await UpdateFoodItemRecord(data, authrizations);
        }else if(operation === FromActions.DE){
            await DeleteStoreItemRecord(data, authrizations);
        }
        setTimeout(async()=>{
            await GetListOfFoodItem(authrizations);
            await setLoading(false);
            await this.handelFromAction();
        },API_EXE_TIME)
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    FoodAction:bindActionCreators(FoodAction, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(FoodManagement);