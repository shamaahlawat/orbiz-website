import actionTypes from '../action_types';
import * as API from '../../../data/config/api';
// import initialStates from './states';

export function initializeCart() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.INITIALIZE_CART
        });
    };
}

export function addToCart(cart_item) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                cart_item
            }
        });
    };
}

export function removeFromCart(cart_item, index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: {
                index,
                cart_item
            }
        });
    };
}

export function editCartItem(cart_item, index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.EDIT_CART_ITEM,
            payload: {
                index,
                cart_item
            }
        });
    };
}

export function incQuantity(cart_item, index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.INC_QUANTITY,
            payload: {
                index,
                cart_item
            }
        });
    };
}

export function decQuantity(cart_item, index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.DEC_QUANTITY,
            payload: {
                index,
                cart_item
            }
        });
    };
}

export function createOrder(order) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.ORDER_ADDING
        });

        API.createOrder({order}).then(response => {
            dispatch({
                type: actionTypes.ORDER_ADDED,
                payload: {
                    order_details: response.data.order
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.ORDER_ADD_ERR
            });
        });
    };
}

export function updatePaymentStatus() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.PAYMENT_STATUS_UPDATE
        });
    };
}

export function updateShippingDetails(shipping_address) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_SHIPPING_ADDRESS,
            payload: {
                shipping_address
            }
        });
    };
}
