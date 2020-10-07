import React, { Component } from 'react';
import HotelTabel from './HotelTable';
import HotelTabelFrom from './TableFrom';
import Loader from '../utilites/Loader';
import * as HotelTableAction from '../../redux/actions/HotelTableAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
        const { formAction }=this.state
        return formAction ? this.loadHotelTableFrom() : this.loadHotelTable();
    }

    loadHotelTableFrom=()=>{
        const { operation }=this.state
        return <HotelTabelFrom
            SaveMethod={this.CallSaveHotelTable}
            operation={operation}
        />
    }

    loadHotelTable=()=>{
        const { loadHotelTableList }=this.state
        return loadHotelTableList ? <Loader message="Loading Hotel Tabel List" size={40} /> : this.loadingHotelTable();
    }

    loadingHotelTable=()=>{
        return <HotelTabel 
            fromAction={this.handelFromAction}
            SaveMethod={this.CallSaveHotelTable}
        />
    }

    CallSaveHotelTable=(sendUserValues)=>{
        console.log("Data ",sendUserValues);
    }
}

const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    HotelTableAction: bindActionCreators(HotelTableAction, dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(TableManagement);