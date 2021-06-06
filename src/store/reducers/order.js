import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchase: false,
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            const fetchedOrders = [];
            for (let key in action.order) {
                console.log(action.order[key])
                fetchedOrders.push({
                    ...action.order[key],
                    id: key
                });
            }
            return {
                ...state,
                orders: fetchedOrders,
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchase: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                orders: state.order.concat(newOrder),
                purchase: true

            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,

            }
        default:
            return state
    }
}

export default reducer
