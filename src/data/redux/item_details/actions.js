import actionTypes from '../action_types';
import * as API from '../../config/api';

export function getNumberPlates() {
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

export function getFrames() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.FRAMES_LOADING
        });

        API.getProducts().then(response => {
            dispatch({
                type: actionTypes.FRAMES_LOADED,
                payload: {
                    frames: response.data.products
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.FRAMES_LOAD_ERR
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
                type: actionTypes.ITEM_LOAD_ERR,
            });
        });

        // setTimeout(() => {
        //     dispatch({
        //         type: actionTypes.ITEM_LOADED,
        //         payload: {
        //             item: {
        //                 _id: item_id,
        //                 type: "number_plate",
        //                 name: "Orbiz UK",
        //                 hasOffer: true,
        //                 price: 899,
        //                 offerPrice: 774,
        //                 description: "Choose a number plate design and add the product to the cart. You can give vehicle registration details on the check out page.1 Product contains two number plates, front and back.",
        //                 imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg",
        //                 tags: ['car', 'orbiz'],
        //                 designs: [
        //                     {
        //                         name: "Black",
        //                         image: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/12/red-D-speedx-car.jpg?zoom=2&resize=600%2C0",
        //                         front_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/1.1.png",
        //                         rear_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/1.2.png"
        //                     },
        //                     {
        //                         name: "Orange",
        //                         image: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/12/ind-roman-car.jpg?fit=4961%2C4961",
        //                         front_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/2.1.png",
        //                         rear_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/2.2.png"
        //                     },
        //                     {
        //                         name: "Blue",
        //                         image: "https://i1.wp.com/orbiz.in/wp-content/uploads/2017/12/blue-flage-speedx-car-n8mber-plate.jpg?zoom=2&resize=600%2C0",
        //                         front_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/3.1.png",
        //                         rear_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/3.2.png"
        //                     },
        //                     {
        //                         name: "Green",
        //                         image: "https://i0.wp.com/orbiz.in/wp-content/uploads/2017/12/black-ind-speedx-car.jpg?zoom=2&resize=600%2C0",
        //                         front_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/4.1.png",
        //                         rear_image: "https://res.cloudinary.com/poletalks/image/upload/c_scale,w_100/v1518796033/orbiz/4.2.png"
        //                     }
        //                 ],
        //                 features: {
        //                     title: "ORBIZ VEHICLE NUMBER PLATES",
        //                     subtitle: "OrbizAutomotivez engaged in exporting and manufacturing a wide range of best quality Aluminium Number Plates to our clients in India. These Aluminium Number Plates are in high demand in the market. Different sizes and designs are easily available in the market. Specially made from superior grade aluminum, these Aluminium Number Plates possess some striking features like resistance to rust and durable life",
        //                     list: [
        //                         "Good source of the raw material",
        //                         "Vehicle number plate has Long life",
        //                         "Vehicle number plate Rust resistant",
        //                         "It  will Glow in the dark",
        //                         "Vehicle  number plate is lightweight",
        //                         "Vehicle number plate has Clear visibility",
        //                         "Fine finish",
        //                         "Impact resistant",
        //                     ]
        //                 },
        //                 additional_info: [
        //                     "Orbiz Blank", "Orbiz D Blue", "Orbiz D Red", "Orbiz IND Black", "Orbiz IND Blue", "Orbiz IND Blue Flag", "Orbiz IND Green", "Orbiz IND Orange", "Orbiz IND Red", "Orbiz IND White", "Orbiz IND White Flag", "Orbiz IND Yellow"
        //                 ],
        //                 reviews: []
        //             }
        //         }
        //     });
        // }, 3000);
    };
}
