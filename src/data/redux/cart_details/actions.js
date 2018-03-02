import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

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

        API.createOrder({ order }).then(response => {
            dispatch({
                type: actionTypes.ORDER_ADDED,
                payload: {
                    order_details: response.data
                }
            });
            let order_details = {
                ...response.data,
                total_count: order.order_items_attributes.length,
                email: order.shipping_address_attributes.email,
                phone: order.shipping_address_attributes.phone
            };
            openRazorPay(dispatch, order_details);
        }).catch(() => {
            dispatch({
                type: actionTypes.ORDER_ADD_ERR
            });
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

export function showPaymentPage(order) {
    return function (dispatch) {
        openRazorPay(dispatch, order);
    };
}

function openRazorPay(dispatch, order) {
    window.openPaymentPage(order,(razorResponse) => {
        dispatch({
            type: actionTypes.ORDER_UPDATING,
            payload: {
                razorpay_id: razorResponse.razorpay_payment_id
            }
        });

        API.updatePaymentStatus({ order_id: order.id, razorpay_id: razorResponse.razorpay_payment_id, amount: order.total }, (res) => {
            dispatch({
                type: actionTypes.ORDER_UPDATED,
                payload: res.order
            });
        }, () => {
            dispatch({
                type: actionTypes.ORDER_UPDATE_ERR
            });
        });
    });
}

export function clearCart() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.CLEAR_CART
        });
    };
}
