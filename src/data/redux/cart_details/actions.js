import actionTypes from '../action_types';
// import initialStates from './states';

export function initializeCurrentOrder(data) {
    let cart_details = localStorage.getItem("cart_details");
    if (cart_details) {
        data = JSON.parse(cart_details);
    }

    return function (dispatch) {
        dispatch({
            type: actionTypes.INITIALIZE_CART,
            payload: data
        });
    };
}

export function addToCart(item) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.SYST_LANG_SET,
            payload: {
                item
            }
        });
    };
}

export function removeFromCart(item) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.SYST_LANG_SET,
            payload: {
                item
            }
        });
    };
}
