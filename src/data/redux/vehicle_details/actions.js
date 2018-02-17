import actionTypes from '../action_types';

export function getVehicleDetails(model_id) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.VEHICLE_LOADING
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.VEHICLE_LOADED,
                payload: {
                    vehicle_details: {
                        _id: model_id,
                        name: "Tesla Model S",
                        images: {
                            white: {
                                front: "https://res.cloudinary.com/poletalks/image/upload/v1518872183/orbiz/2015-tesla-model-s-sedan-front-view.png",
                                rear: "https://res.cloudinary.com/poletalks/image/upload/v1518872212/orbiz/2015-tesla-model-s-sedan-rear-view.png"
                            },
                            black: {
                                front: "https://res.cloudinary.com/poletalks/image/upload/v1518873930/orbiz/tesla-s-black-back.png",
                                rear: "https://res.cloudinary.com/poletalks/image/upload/v1518873928/orbiz/tesla-s-black-front.png"
                            },
                            red: {
                                front: "https://res.cloudinary.com/poletalks/image/upload/v1518874045/orbiz/8319_st1280_118.jpg",
                                rear: "https://res.cloudinary.com/poletalks/image/upload/v1518874066/orbiz/8319_st1280_119.jpg"
                            }
                        }
                    }
                }
            });
        }, 3000);
    };
}
