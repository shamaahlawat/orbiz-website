import actionTypes from '../action_types';

const numplates = [
    {
        _id: 0,
        name: 'Black Batman',
        hasOffer: true,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
    },
    {
        _id: 1,
        name: "Black German Speedx",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
    },
    {
        _id: 2,
        name: "Black German Speedx",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i1.wp.com/orbiz.in/wp-content/uploads/2017/12/IND-blue-flag.jpg"
    },
    {
        _id: 3,
        name: "Black German Speedx",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "//i2.wp.com/orbiz.in/wp-content/uploads/2017/11/BLANK-GERMAN.jpg?resize=300%2C300&ssl=1"
    },
    {
        _id: 4,
        name: "Black German",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
    },
    {
        _id: 5,
        name: "Black Spanish",
        hasOffer: true,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
    },
    {
        _id: 6,
        name: "Blue batman",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
    },
    {
        _id: 7,
        name: "Black Speedx",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
    },
    {
        _id: 8,
        name: "German",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
    },
    {
        _id: 9,
        name: "Black German",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
    },
    {
        _id: 10,
        name: "Black Speedx",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "//i0.wp.com/orbiz.in/wp-content/uploads/2017/11/blank-euro-1.jpg"
    },
    {
        _id: 11,
        name: "German Speedx",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
    }
];

const frames = [
    {
        _id: 0,
        name: 'Orbiz Adjustable Frame Type A(ADFT101)',
        hasOffer: true,
        price: 799,
        offerPrice: 399,
        imageUrl: "https://i1.wp.com/orbiz.in/wp-content/uploads/2018/01/adft101.jpg"
    },
    {
        _id: 1,
        name: "Car Frame",
        hasOffer: false,
        price: 599,
        offerPrice: 399,
        imageUrl: "//i1.wp.com/orbiz.in/wp-content/uploads/2018/01/car-frame.jpg?resize=300%2C300&ssl=1"
    },
    {
        _id: 2,
        name: "Orbiz Adjustable Frame Type B(ADFT102)",
        hasOffer: false,
        price: 799,
        offerPrice: 399,
        imageUrl: "//i2.wp.com/orbiz.in/wp-content/uploads/2018/01/adft104.jpg?resize=300%2C300&ssl=1"
    },
    {
        _id: 3,
        name: "Black German Speedx",
        hasOffer: false,
        price: 1400,
        offerPrice: 700,
        imageUrl: "//i0.wp.com/orbiz.in/wp-content/uploads/2018/01/adft102.jpg?resize=300%2C300&ssl=1"
    }
];

export function getNumberPlates() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.NUMPLATES_LOADING
        });

        setTimeout(()=> {
            dispatch({
                type: actionTypes.NUMPLATES_LOADED,
                payload: {
                    numplates
                }
            });
        }, 3000);
    };
}

export function getFrames() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.FRAMES_LOADING
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.FRAMES_LOADED,
                payload: {
                    frames
                }
            });
        }, 2000);
    };
}

export function getItemDetails(item_id) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.ITEM_LOADING
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.ITEM_LOADED,
                payload: {
                    item: {
                        _id: 0,
                        type: "number_plate",
                        name: "Orbiz UK",
                        hasOffer: true,
                        price: 899,
                        offerPrice: 774,
                        description: "Choose a number plate design and add the product to the cart. You can give vehicle registration details on the check out page.1 Product contains two number plates, front and back.",
                        imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg",
                        tags: ['car', 'orbiz'],
                        designs: [
                            "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/12/red-D-speedx-car.jpg?zoom=2&resize=600%2C0",
                            "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/12/ind-roman-car.jpg?zoom=2&resize=600%2C0",
                            "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/12/ind-roman-car.jpg?fit=4961%2C4961",
                            "https://i0.wp.com/orbiz.in/wp-content/uploads/2017/12/black-ind-speedx-car.jpg?zoom=2&resize=600%2C0",
                            "https://i0.wp.com/orbiz.in/wp-content/uploads/2017/12/black-ind-speedx-car.jpg?fit=4961%2C4961",
                            "https://i1.wp.com/orbiz.in/wp-content/uploads/2017/12/blue-flage-speedx-car-n8mber-plate.jpg?zoom=2&resize=600%2C0"
                        ],
                        features: {
                            title: "ORBIZ VEHICLE NUMBER PLATES",
                            subtitle: "OrbizAutomotivez engaged in exporting and manufacturing a wide range of best quality Aluminium Number Plates to our clients in India. These Aluminium Number Plates are in high demand in the market. Different sizes and designs are easily available in the market. Specially made from superior grade aluminum, these Aluminium Number Plates possess some striking features like resistance to rust and durable life",
                            list: [
                                "Good source of the raw material",
                                "Vehicle number plate has Long life",
                                "Vehicle number plate Rust resistant",
                                "It  will Glow in the dark",
                                "Vehicle  number plate is lightweight",
                                "Vehicle number plate has Clear visibility",
                                "Fine finish",
                                "Impact resistant",
                            ]
                        },
                        additional_info: [
                            "Orbiz Blank", "Orbiz D Blue", "Orbiz D Red", "Orbiz IND Black", "Orbiz IND Blue", "Orbiz IND Blue Flag", "Orbiz IND Green", "Orbiz IND Orange", "Orbiz IND Red", "Orbiz IND White", "Orbiz IND White Flag", "Orbiz IND Yellow"
                        ],
                        reviews: []
                    }
                }
            });
        }, 3000);
    };
}
