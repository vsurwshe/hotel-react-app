const { default: actions } = require("redux-form/lib/actions")

const initialState={
    listOfStoreItem:[],
    storeItemData:[],
    message:""
}

const StoreState=(state=initialState, action)=>{
    switch (action && action.type) {
        case "SAVE_STORE_ITEM_LIST":
            return {...state, listOfStoreItem: action.storeItemList}
        case "SAVE_STORE_ITEM_LIST":
            return {...state, storeItemData: action.storeItemData}
        case "UPDATE_STORE_ITEM_DATA":
            return {...state, storeItemData: action.storeItemData}
        case "DELETE_STORE_ITEM_DATA":
            return {...state, message: action.message}
        default:
            return state;
    }
}

export default StoreState;