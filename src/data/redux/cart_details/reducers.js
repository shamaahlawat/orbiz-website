import actionTypes from '../action_types';
import initialStates from './states';

export default function cart_details(state = initialStates.cart_details, action) {

    switch (action.type) {
        case actionTypes.INITIALIZE_CART: {
            let cart_details = localStorage.getItem('cart_details') ? JSON.parse(localStorage.getItem('cart_details')) : state;
            cart_details.total_amount = 0;
            cart_details.cart_items.map(item => {
                cart_details.total_amount += item.amount;
                return item;
            });
            return cart_details;
        }

        case actionTypes.ADD_TO_CART: {
            let hasItemAdded = false;
            let cart_items = state.cart_items.map((item) => {
                if (item.product_id === action.payload.cart_item.product_id && item.variant_id === action.payload.cart_item.variant_id && item.product_type_id === action.payload.cart_item.product_type_id) {
                    hasItemAdded = true;
                    return {
                        ...item,
                        quantity: item.quantity + action.payload.cart_item.quantity,
                        amount: item.amount + action.payload.cart_item.amount
                    };
                } else {
                    return item;
                }
            });
            let cart_details = {
                ...state,
                cart_items: (hasItemAdded) ? cart_items : [...cart_items, action.payload.cart_item],
                cart_item_ids: (hasItemAdded) ? state.cart_item_ids : [...state.cart_item_ids, action.payload.cart_item.id],
                total_amount: state.total_amount + action.payload.cart_item.amount
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.REMOVE_FROM_CART: {
            let cart_details = {
                ...state,
                cart_items: [
                    ...state.cart_items.slice(0, action.payload.index),
                    ...state.cart_items.slice(action.payload.index + 1)
                ],
                cart_item_ids: [
                    ...state.cart_item_ids.slice(0, action.payload.index),
                    ...state.cart_item_ids.slice(action.payload.index + 1)
                ],
                total_amount: state.total_amount - action.payload.cart_item.amount
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.EDIT_CART_ITEM: {
            let cart_details = {
                ...state,
                cart_items: state.cart_items.map((item, i) => i === action.payload.index ? action.payload.cart_item : item),
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.INC_QUANTITY: {
            let cart_details = {
                ...state,
                cart_items: state.cart_items.map((item, i) => {
                    return (i === action.payload.index) ? {
                        ...item,
                        quantity: item.quantity + 1,
                        amount: item.amount + item.price
                    } : item;
                }),
                total_amount: state.total_amount + action.payload.cart_item.price
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.DEC_QUANTITY: {
            let cart_details;
            if (action.payload.cart_item.quantity === 1) {
                cart_details = {
                    ...state,
                    cart_items: [
                        ...state.cart_items.slice(0, action.payload.index),
                        ...state.cart_items.slice(action.payload.index + 1)
                    ],
                    cart_item_ids: [
                        ...state.cart_item_ids.slice(0, action.payload.index),
                        ...state.cart_item_ids.slice(action.payload.index + 1)
                    ],
                    total_amount: state.total_amount - action.payload.cart_item.amount
                };
                localStorage.setItem('cart_details', JSON.stringify(cart_details));
                return cart_details;
            } else {
                cart_details = {
                    ...state,
                    cart_items: state.cart_items.map((item, i) => {
                        return (i === action.payload.index) ? {
                            ...item,
                            quantity: item.quantity - 1,
                            amount: item.amount - item.price
                        } : item;
                    }),
                    total_amount: state.total_amount - action.payload.cart_item.price
                };
                localStorage.setItem('cart_details', JSON.stringify(cart_details));
                return cart_details;
            }
        }

        case actionTypes.ORDER_ADDING: {
            let cart_details = {
                ...state,
                loaders: {
                    ...state.loaders,
                    order_adding: true,
                    order_added: false,
                    order_add_err: false
                },
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.ORDER_ADDED: {
            let cart_details = {
                ...state,
                order_details: action.payload.order_details,
                loaders: {
                    ...state.loaders,
                    order_adding: false,
                    order_added: true,
                    order_add_err: false
                },
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.ORDER_ADD_ERR: {
            let cart_details = {
                ...state,
                loaders: {
                    ...state.loaders,
                    order_adding: false,
                    order_added: false,
                    order_add_err: true
                },
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.ORDER_UPDATING: {
            let cart_details = {
                ...state,
                razorpay_id: action.payload.razorpay_id,
                loaders: {
                    ...state.loaders,
                    order_updating: true,
                    order_updated: false,
                    order_update_err: false
                },
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.ORDER_UPDATED: {
            let cart_details = {
                ...state,
                order_details: action.payload.order_details,
                loaders: {
                    ...state.loaders,
                    order_updating: false,
                    order_updated: true,
                    order_update_err: false
                },
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.ORDER_UPDATE_ERR: {
            let cart_details = {
                ...state,
                loaders: {
                    ...state.loaders,
                    order_updating: false,
                    order_updated: false,
                    order_update_err: true
                },
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.UPDATE_SHIPPING_ADDRESS: {
            let cart_details = {
                ...state,
                shipping_address: action.payload.shipping_address,
            };
            localStorage.setItem('cart_details', JSON.stringify(cart_details));
            return cart_details;
        }

        case actionTypes.CLEAR_CART: {
            let cart_details = {
                cart_items: [],
                cart_item_ids: [],
                total_amount: 0,
                shipping_address: {
                    address: "",
                    pincode: "",
                    city: "",
                    state: "",
                    country: "India",
                    email: "",
                    phone: "",
                },
                order_id: undefined,
                payment_status: undefined,
                order_details: {},
                loaders: {
                    order_adding: false,
                    order_added: false,
                    order_add_err: false,
                    order_updating: false,
                    order_updated: false,
                    order_update_err: false,
                }
            };
            localStorage.removeItem('cart_details');
            return cart_details;
        }

        default: {
            return state;
        }
    }
}
