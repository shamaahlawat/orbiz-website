import actionTypes from '../action_types';
import * as API from '../../config/api';

export function getProducts() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.NUMPLATES_LOADING
        });

        API.getProducts().then(response => {
            dispatch({
                type: actionTypes.NUMPLATES_LOADED,
                payload: {
                    numplates: response.data.products
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.NUMPLATES_LOAD_ERR
            });
        });
    };
}

export function getItemDetails(product_id) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.ITEM_LOADING
        });

        API.getProduct({ product_id }).then(response => {
            dispatch({
                type: actionTypes.ITEM_LOADED,
                payload: {
                    item: response.data.product
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.ITEM_LOAD_ERR
            });
        });
    };
}
