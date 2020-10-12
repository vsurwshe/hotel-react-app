import React, { Component } from 'react';
import HotelTabel from './HotelTable';
import HotelTabelFrom from './TableFrom';
import Loader from '../utilites/Loader';
import * as HotelTableAction from '../../redux/actions/HotelTableAction';
import * as MainOrdersAction from '../../redux/actions/MainOrdersAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';

class TableManagement extends Component {
    state = { 
        loadHotelTableList:false,
        formAction:false,
        hotelTableData:[],
        operation:""
    }

    componentDidMount=async()=>{
        const { listOfHotelTable }=this.props.HotelTableState
        const { getListOfHotelTable }=this.props.HotelTableAction
        const { authrizations }=this.props.LoginState
        await this.handelHotelTableList();
        (listOfHotelTable && listOfHotelTable.length <=0) && await getListOfHotelTable(authrizations);
        await this.handelHotelTableList();
    }

    handelHotelTableList=()=>{this.setState({loadHotelTableList : !this.state.loadHotelTableList})}

    handelFromAction=(hotelTableData, operation)=>{this.setState({formAction: !this.state.formAction, operation, hotelTableData})}

    render() { 
        const { formAction, hotelTableData }=this.state
        return formAction ? this.loadHotelTableFrom(hotelTableData) : this.loadHotelTable();
    }

    loadHotelTableFrom=(hotelTableData)=>{
        const { operation }=this.state
        return <HotelTabelFrom
            SaveMethod={this.callHotelTableApi}
            operation={operation}
            initialValues={hotelTableData}
            cancel={this.handelFromAction}
        />
    }

    loadHotelTable=()=>{
        const { loadHotelTableList }=this.state
        return loadHotelTableList ? <Loader message="Loading Hotel Tabel List" size={40} /> : this.loadingHotelTable();
    }

    loadingHotelTable=()=>{
        return <HotelTabel 
            fromAction={this.handelFromAction}
        />
    }

    callHotelTableApi=async(props)=>{
        const { data, setLoading, operation}=props
        const { authrizations }= this.props.LoginState
        const { getListOfHotelTable, saveHotelTableRecord, updateHotelTableRecord, deleteHotelTableRecord}=this.props.HotelTableAction
        const { getFreeTableList }=this.props.MainOrdersAction
        await setLoading(true);
        if(operation === FromActions.CR){
            await saveHotelTableRecord(data, authrizations);
        }else if(operation === FromActions.ED){
            await updateHotelTableRecord(data, authrizations);
        }else if(operation === FromActions.DE){
            await deleteHotelTableRecord(data, authrizations);
        }
        setTimeout(async()=>{
            await getListOfHotelTable(authrizations);
            await getFreeTableList(authrizations);
            await setLoading(false);
            await this.handelFromAction();
        },API_EXE_TIME)
    }
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    HotelTableAction: bindActionCreators(HotelTableAction, dispatch),
    MainOrdersAction: bindActionCreators(MainOrdersAction, dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(TableManagement);