import React, { Component } from 'react';
import { Button, Card, CardContent, CardHeader, Dialog, DialogContent, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_EXE_TIME, FromActions } from '../../assets/config/Config';
import * as HotelTableAction from '../../redux/actions/HotelTableAction'
import * as OrderAction from '../../redux/actions/MainOrdersAction'
import * as StoreAction from '../../redux/actions/StoreAction'
import "./css/Grid.css";
import { BookTabelForm, OrderFoodTabel } from './OrdersFroms';

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
        const { getBookTableList, getFreeTableList }=this.props.OrderAction
        const { GetListOfStoreItem }= this.props.StoreAction
        await this.handelHotelOrders();
        (listOfFreeTabels && listOfFreeTabels.length <=0) && await getFreeTableList(authrizations);
        (listOfBookedTabels && listOfBookedTabels.length <=0) && await getBookTableList(authrizations);
        (listOfStoreItem && listOfStoreItem.length <=0) && await GetListOfStoreItem(authrizations);
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
                <center>
                    <Button type="button" variant="outlined" color="secondary" onClick={() => this.handelOrder() }> Cancel</Button>&nbsp;&nbsp;
                </center>
            </DialogContent>
        </Dialog>
    }

    loadMainOrderTabel=()=>{
        return <Card>
            <CardHeader  title="Order tables" />
            <CardContent className="grid">
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

    callSaveFoodApi=async(propsData)=>{
        const { data, resolve, tableData, action }=propsData
        const { createOrderTabelRecord, getOrderFoodListByTableId, updateOrderFood, deleteOrderFood }= this.props.OrderAction
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
            await getOrderFoodListByTableId(tableData.booked_tabel_id, authrizations);
            resolve();
        }, API_EXE_TIME)
    }
}

// const OrderFoodTabel=(props)=>{
//     const { columns, SaveMethod, tableData}=props
//     const { authrizations }=props.mainProps.LoginState
//     const { getOrderFoodListByTableId }=props.mainProps.OrderAction
//     const { bookedTabelFoodList }=props.mainProps.MainOrdersState
//     const [loadList, setLoadList] = useState(false);
//     useEffect(() => {
//         loadInitalData();
//     }, [])

//     const loadInitalData=async()=>{
//         await  setLoadList(true);
//         await getOrderFoodListByTableId(tableData.booked_tabel_id, authrizations);
//         await setLoadList(false);
//     }
//     return <>
//     {loadList ? <Loader  message="Loading food tabel list" size={50}/> :
//     <MaterialTable
//         title=""
//         columns={columns}
//         data={(bookedTabelFoodList && bookedTabelFoodList.length > 0) ? bookedTabelFoodList : []}
//         options={{
//           headerStyle: { backgroundColor: '#01579b', color: '#FFF' },
//           search: false,
//           actionsColumnIndex: -1
//         }} 
//         icons={{Add: () => <Button variant="contained" color="primary">Add Food</Button> }}
//         editable={{
//             isEditable: rowData => true, 
//             isEditHidden: rowData => false,
//             isDeletable: rowData => true,
//             isDeleteHidden: rowData => false,
//             onRowAdd: newData =>{
//                 return new Promise(async(resolve, reject) => {
//                     if(newData){
//                         SaveMethod({data:newData, resolve, tableData, action:FromActions.CR})
//                     }else{
//                         reject();
//                     }
//                 }
//             )},
//             onRowUpdate: (newData, oldData) =>{
//               return new Promise(async(resolve, reject) => {
//                 if(newData){
//                     SaveMethod({data:newData, resolve, tableData, action:FromActions.ED})
//                 }else{
//                   reject();
//                 }
//               })
//             },
//             onRowDelete: oldData =>{
//               return new Promise(async(resolve, reject) => {
//                     if(oldData){
//                         SaveMethod({data:oldData, resolve, tableData, action:FromActions.DE})
//                     }else{
//                         reject();
//                     }
//                })
//             }
//           }}
//   />}
//   </>
// }
 
const mapStateToProps=state=>{return state}
const mapDispatchToProps=dispatch=>({
    HotelTableAction: bindActionCreators(HotelTableAction, dispatch),
    OrderAction: bindActionCreators(OrderAction, dispatch),
    StoreAction: bindActionCreators(StoreAction, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(OrdersManagement);