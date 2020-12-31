const initialState={
    listOfFoodsItem:[],
    foodItemData:[],
    message:""
}

const FoodState=(state=initialState, action)=>{
    switch (action && action.type) {
        case "SAVE_FOOD_ITEM_LIST":
            return {...state, listOfFoodsItem: action.foodItemList}
        case "SAVE_FOOD_ITEM_DATA":
            return {...state, foodItemData: action.foodItemData}
        case "UPDATE_FOOD_ITEM_DATA":
            return {...state, foodItemData: action.foodItemData}
        case "DELETE_FOOD_ITEM_DATA":
            return {...state, message: action.message}
        default:
            return state;
    }
}

export default FoodState;