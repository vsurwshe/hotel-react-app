import React, { Component } from 'react';
import { Button, Card, CardContent, CardHeader, Dialog, DialogContent, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
import * as HotelTableAction from '../../redux/actions/HotelTableAction'
import * as OrderAction from '../../redux/actions/MainOrdersAction'
import * as StoreAction from '../../redux/actions/StoreAction'
import * as InvoiceAction from '../../redux/actions/InvoiceAction'
import "./css/Grid.css";
import { BookTabelForm, OrderFoodTabel, MainOrderFoodTabel } from './OrdersFroms';
import Loader from '../utilites/Loader';

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
        const { listOfStoreItem }=this.props.StoreState
        const { listOfInvoice }=this.props.InvoiceState
        const { getBookTableList, getFreeTableList }=this.props.OrderAction
        const { GetListOfStoreItem }= this.props.StoreAction
        const { getListOfInvoice }= this.props.InvoiceAction
        await this.handelHotelOrders();
        (listOfFreeTabels && listOfFreeTabels.length <=0) && await getFreeTableList(authrizations);
        (listOfBookedTabels && listOfBookedTabels.length <=0) && await getBookTableList(authrizations);
        (listOfStoreItem && listOfStoreItem.length <=0) && await GetListOfStoreItem(authrizations);
        (listOfInvoice && listOfInvoice.length <=0) && await getListOfInvoice(authrizations);
        await this.handelHotelOrders();
    }

    handelHotelOrders=()=>{this.setState({loadHotelOrders : !this.state.loadHotelOrders})}

    handelBookTable=(bookTabelData)=>{  this.setState({ bookTabelValue : !this.state.bookTabelValue, bookTabelData}) }

    handelOrder=(orderTableData)=>{  this.setState({ orderVaule : !this.state.orderVaule, orderTableData}) }

    render() { 
        const { loadHotelOrders }=this.state
        return loadHotelOrders ? <Loader message="Loading..." size={50} /> : this.loadGrid();
    }
    
    loadGrid=()=>{
        return <>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6} >
                    <Grid item> {this.loadFreeTables()} </Grid>
                    <Grid item style={{marginTop:10}}>{this.loadBookedTables()}   </Grid>
                </Grid>
                <Grid item xs={12} sm={6} > {this.loadMainOrderTabel()} </Grid>
            </Grid>
        </>
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
        const { item, key }=props
        return <center className="item" key={key}>
            <img src="img/freeTabel.png" alt="freeTabel" onClick={()=>this.handelBookTable(item)} />
            {item.table_name}
        </center>
    }

    loadSingleBookTable=(props)=>{
        const { item, key }=props
        return <center className="item" key={key}>
            <img src="img/bookedTabel.png" alt="bookedTabel" onClick={()=>this.handelOrder(item)} />
            {item.booked_tabel_name}
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
                    action={FromActions.CR}
                /> 
            </DialogContent>
        </Dialog>
    }

    addOrder=()=>{
        const { orderVaule, orderTableData }=this.state
        const { listOfStoreItem }=this.props.StoreState
          // creating columns
        const columns = [
          { title: 'Name', 
            field: 'order_food_name',
            editComponent: props=>{
                const { order_food_name }=props.rowData
                return <select id="order_food_name" value={order_food_name} onChange={(event) =>{
                        var data = { ...props.rowData };
                        let filterRecord=(listOfStoreItem && listOfStoreItem.length >0) && listOfStoreItem.filter((item)=> item.product_name === event.target.value)    
                        data.order_food_name= event.target.value;
                        data.order_food_unit_price= (filterRecord && filterRecord.length >0 ) ? filterRecord[0].product_unit_price :""
                        props.onRowDataChange(data);
                    }}>
                    <option value="">Select Food Name</option>
                    { (listOfStoreItem && listOfStoreItem.length >0) && listOfStoreItem.map((item,key)=><option key={key} value={item.product_name}>{item.product_name}</option>)}
                </select>
            } 
          },
          { title: 'Price', field: 'order_food_unit_price', editable: 'never',width:10},
          { title: 'Qty', field: 'order_food_qty', 
            editComponent: props=>{
                const { order_food_name, order_food_qty }=props.rowData
                return  <input style={{width:"100%", backgroundColor:"skyblue"}} id="order_food_qty" value={order_food_qty} onChange={(event) => {
                    var data = { ...props.rowData };
                    let filterRecord=(listOfStoreItem && listOfStoreItem.length >0) && listOfStoreItem.filter((item)=> item.product_name === order_food_name);
                    let netPrice= (filterRecord && filterRecord.length >0  && event.target.value ) && filterRecord[0].product_unit_price * event.target.value;
                    data.order_food_qty= event.target.value;
                    data.order_food_total_price= netPrice;
                    props.onRowDataChange(data);
                }} type="number"  />
            }
          },
          {  title: 'Total',  field: 'order_food_total_price', editable: 'never', width:10 }
        ];
        return <Dialog open={orderVaule} onClose={this.handelOrder} aria-labelledby="form-dialog-title">
            <DialogContent>
                 <div>
                    <label>Tabel Name: {orderTableData && orderTableData.booked_tabel_name}</label><br />
                    <label>Customer Size: {orderTableData && orderTableData.booked_tabel_customer_size}</label>
                 </div>
                <OrderFoodTabel  mainProps={this.props} tableData={orderTableData} columns={columns} SaveMethod={this.callSaveFoodApi}  />
                <div style={{float:"right", marginTop:10}}>
                    <Button type="button" variant="outlined" color="primary" onClick={() => this.callSaveInvoiceApi({data: orderTableData, action:FromActions.DE}) }> Make Invoice </Button>&nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="primary" onClick={() => this.callBookTabelApi({data: orderTableData, action:FromActions.DE}) }> Free table </Button>&nbsp;&nbsp;
                    <Button type="button" variant="outlined" color="secondary" onClick={() => this.handelOrder() }> Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    }

    loadMainOrderTabel=()=>{
        const { orderFoodList }=this.props.MainOrdersState
        const columns = [
            { title: 'Sr.no', field: 'key',width:10},
            { title: 'Table\u00a0Name', field: 'table_name'},
            { title: 'Table\u00a0Order\u00a0Count', field: 'table_food_count',width:10},
        ];
        let tabelData = (orderFoodList && orderFoodList.length >0)&& orderFoodList.map((item,key)=>{ return {data:item.food_list, "key":key+1, "table_food_count":item.food_count , "table_name": item.table && item.table.booked_tabel_name}})
        return <MainOrderFoodTabel columns={columns} data={tabelData} />
    }

    callBookTabelApi=async(props)=>{
        const { data, setLoading, action }=props
        const { authrizations }=this.props.LoginState
        const { getBookTableList, getFreeTableList, createBookTabelRecord, deleteBookTabelRecord }=this.props.OrderAction
        if(action === FromActions.CR){
            let newBookTabelData={
                ...data,
                "booked_tabel_name": data.table_name,
                "booked_tabel_customer_size": data.table_customer_size
            }
            await setLoading(true);
            await createBookTabelRecord(newBookTabelData, authrizations);
        }else if(action === FromActions.DE){
            await deleteBookTabelRecord(data.table_id , authrizations)
        }
        setTimeout(async()=>{
            await getBookTableList(authrizations);
            await getFreeTableList(authrizations);
            setLoading && await setLoading(false);
            (action === FromActions.CR) && await this.handelBookTable();
            (action === FromActions.DE) && await this.handelOrder();
        },API_EXE_TIME)
    }

    callSaveFoodApi=async(propsData)=>{
        const { data, resolve, tableData, action }=propsData
        const { getBookTableList, createOrderTabelRecord, getOrderFoodListByTableId, updateOrderFood, deleteOrderFood }= this.props.OrderAction
        const { authrizations }=this.props.LoginState
        if(action === FromActions.CR){
            let newDataPost={
                ...data,
                "booked_tabel_id":tableData.booked_tabel_id
            }
            await createOrderTabelRecord(newDataPost, authrizations);
        }else if(action === FromActions.ED){
            let newDataPost={
                "order_food_id":data.order_food_id,
                "order_food_name":data.order_food_name,
                "order_food_qty":data.order_food_qty,
                "order_food_total_price":data.order_food_total_price,
                "order_food_unit_price":data.order_food_unit_price,
                "booked_tabel_id":tableData.booked_tabel_id
            }
            await updateOrderFood(newDataPost, authrizations);
        }else if(action === FromActions.DE){
            await deleteOrderFood(data.order_food_id, authrizations);
        }
        setTimeout(async()=>{
            await getBookTableList(authrizations);
            await getOrderFoodListByTableId(tableData.booked_tabel_id, authrizations);
            resolve();
        }, API_EXE_TIME)
    }

    callSaveInvoiceApi=(propsData)=>{
        const { data, resolve, tableData, action }=propsData
        console.log("Data ",data)
    }
}
 
const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    dispatch,
    HotelTableAction: bindActionCreators(HotelTableAction, dispatch),
    OrderAction: bindActionCreators(OrderAction, dispatch),
    StoreAction: bindActionCreators(StoreAction, dispatch),
    InvoiceAction: bindActionCreators(InvoiceAction,dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(OrdersManagement);