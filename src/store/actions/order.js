import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,

    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
            .then((res) => {
               dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFail(err))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        loading: false
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrder = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json?auth=' + token)
            .then((res) => {
                dispatch(fetchOrderSuccess(res.data))
            })
            .catch((err) => {
                dispatch(fetchOrderFail(err))
            })
    }
}
