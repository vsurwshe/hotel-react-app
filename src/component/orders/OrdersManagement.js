import { Card, CardContent, CardHeader, Container, Dialog, DialogContent, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_EXE_TIME } from '../../assets/config/Config';
import * as HotelTableAction from '../../redux/actions/HotelTableAction'
import * as OrderAction from '../../redux/actions/MainOrdersAction'
import "./css/Grid.css";
import { BookTabelForm } from './OrdersFroms';
class OrdersManagement extends Component {
    state = {  
        loadHotelOrders: false,
        bookTabelValue: false,
        bookTabelData:[],
        orderVaule: false,
        orderTableData:[]
    }

    componentDidMount=async()=>{
        const { authrizations }=this.props.LoginState
        const { listOfBookedTabels, listOfFreeTabels }=this.props.MainOrdersState
        const { getBookTableList, getFreeTableList }=this.props.OrderAction
        await this.handelHotelOrders();
        (listOfFreeTabels && listOfFreeTabels.length <=0) && await getFreeTableList(authrizations);
        (listOfBookedTabels && listOfBookedTabels.length <=0) && await getBookTableList(authrizations);
        await this.handelHotelOrders();
    }

    handelHotelOrders=()=>{this.setState({loadHotelOrders : !this.state.loadHotelOrders})}

    handelBookTable=(bookTabelData)=>{  this.setState({ bookTabelValue : !this.state.bookTabelValue, bookTabelData}) }

    handelOrder=(orderTableData)=>{  this.setState({ orderVaule : !this.state.orderVaule, orderTableData}) }

    render() { 
        return this.loadGrid();
    }
    
    loadGrid=()=>{
        return <Grid container spacing={5}>
            <Grid item xs={12} sm={6} >
                <Grid item> { this.loadFreeTables()}  </Grid>
                <Grid item style={{marginTop:10}}>{ this.loadBookedTables()}</Grid>
            </Grid>
            <Grid item xs={12} sm={6} > {this.loadMainOrderTabel()} </Grid>
        </Grid>
    }

    loadFreeTables=()=>{
        const { listOfFreeTabels }=this.props.MainOrdersState
        return <Card>
            <CardHeader  title="Free Tabels" />
            <CardContent className="grid">
                {this.bookTabel()}
                {(listOfFreeTabels && listOfFreeTabels.length >0) && listOfFreeTabels.map((item,key)=>this.loadSingleFreeTable({item, key}))}
            </CardContent>
        </Card>
    }

    loadBookedTables=()=>{
        const { listOfBookedTabels }=this.props.MainOrdersState
        return <Card>
            <CardHeader  title="Booked Tabels" />
            <CardContent className="grid">
                { this.addOrder()}
                {(listOfBookedTabels && listOfBookedTabels.length >0) && listOfBookedTabels.map((item,key)=>this.loadSingleBookTable({item, key}))}
            </CardContent>
        </Card>
    }

    loadSingleFreeTable=(props)=>{
        const { item }=props
        return <center className="item">
            <img src="img/freeTabel.png" onClick={()=>this.handelBookTable(item)} />
            {item.table_name}
        </center>
    }

    loadSingleBookTable=(props)=>{
        const { item }=props
        return <center className="item">
            <img src="img/bookedTabel.png" />
            {item.table_name}
        </center>
    }

    bookTabel=()=>{
        const { bookTabelValue, bookTabelData }=this.state
        return <Dialog open={bookTabelValue} onClose={this.handelBookTable} aria-labelledby="form-dialog-title">
            <DialogContent> 
                <BookTabelForm 
                    cancel={this.handelBookTable} 
                    initialValues={bookTabelData}
                    SaveMethod={this.callBookTabelApi}
                /> 
            </DialogContent>
        </Dialog>
    }

    addOrder=()=>{
        const { orderVaule, orderTableData }=this.state
        return <Dialog open={orderVaule} onClose={this.handelOrder} aria-labelledby="form-dialog-title">
            <DialogContent> 
                <BookTabelForm 
                    cancel={this.handelBookTable}
                    initialValues={orderTableData} 
                /> 
            </DialogContent>
        </Dialog>
    }

    loadMainOrderTabel=()=>{
        return <Card>
            <CardHeader  title="Booked Tabels" />
            <CardContent className="grid">
               <h4>Order tables</h4>
            </CardContent>
        </Card>
    }

    callBookTabelApi=async(props)=>{
        const { data, setLoading }=props
        const { authrizations }=this.props.LoginState
        const { getBookTableList, getFreeTableList, createBookTabelRecord }=this.props.OrderAction
        let newBookTabelData={
            ...data,
            "booked_tabel_name": data.table_name,
            "booked_tabel_customer_size": data.table_customer_size
        }
        await setLoading(true);
        await createBookTabelRecord(newBookTabelData, authrizations);
        setTimeout(async()=>{
            await getBookTableList(authrizations);
            await getFreeTableList(authrizations);
            await setLoading(false);
            await this.handelBookTable();
        },API_EXE_TIME)
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    HotelTableAction: bindActionCreators(HotelTableAction, dispatch),
    OrderAction: bindActionCreators(OrderAction, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(OrdersManagement);