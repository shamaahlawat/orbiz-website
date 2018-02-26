import actionTypes from '../action_types';
import initialStates from './states';

export default function vehicle_details(state = initialStates.vehicle_details, action) {
    switch (action.type) {
        case actionTypes.VEHICLE_LIST_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    list_loading: true,
                    list_loaded: false,
                    list_load_err: false
                }
            };

        case actionTypes.VEHICLE_LIST_LOADED:
            let vehicle_list = action.payload.vehicle_list;
            localStorage.setItem('vehicle_list', JSON.stringify(vehicle_list));
            return {
                ...state,
                vehicle_list,
                loaders: {
                    ...state.loaders,
                    list_loading: false,
                    list_loaded: true,
                    list_load_err: false
                }
            };
        case actionTypes.VEHICLE_LIST_LOAD_ERR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    list_loading: false,
                    list_loaded: false,
                    list_load_err: true
                }
            };

        case actionTypes.VEHICLE_TYPE_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    type_loading: true,
                    type_loaded: false,
                    type_load_err: false
                }
            };

        case actionTypes.VEHICLE_TYPE_LOADED:
            let vehicle_types = action.payload.vehicle_types;
            localStorage.setItem('vehicle_types', JSON.stringify(vehicle_types));
            return {
                ...state,
                vehicle_types,
                loaders: {
                    ...state.loaders,
                    type_loading: false,
                    type_loaded: true,
                    type_load_err: false
                }
            };

        case actionTypes.VEHICLE_TYPE_LOAD_ERR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    type_loading: false,
                    type_loaded: false,
                    type_load_err: true
                }
            };

        case actionTypes.VEHICLE_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    vehicle_loading: true,
                    vehicle_loaded: false,
                    vehicle_load_err: false
                }
            };

        case actionTypes.VEHICLE_LOADED:
            let current_vehicle = action.payload.vehicle_details;
            localStorage.setItem('current_vehicle', JSON.stringify(current_vehicle));
            return {
                ...state,
                current_vehicle,
                loaders: {
                    ...state.loaders,
                    vehicle_loading: false,
                    vehicle_loaded: true,
                    vehicle_load_err: false
                }
            };

        case actionTypes.VEHICLE_LOAD_ERR:
            return {
                ...state,
                current_vehicle: null,
                loaders: {
                    ...state.loaders,
                    vehicle_loading: false,
                    vehicle_loaded: false,
                    vehicle_load_err: true
                }
            };

        case actionTypes.VEHICLE_REGISTRATION_ENTERED:
            let registration_number = action.payload.registration_number;
            localStorage.setItem('registration_number', JSON.stringify(registration_number));
            return {
                ...state,
                user_vehicle: {
                    ...state.user_vehicle,
                    registration_number
                },
            };

        case actionTypes.VEHICLE_IMAGES_ENTERED:
            let user_vehicle_images = action.payload.user_vehicle_images;
            localStorage.setItem('user_vehicle_images', JSON.stringify(user_vehicle_images));
            return {
                ...state,
                user_vehicle: {
                    ...state.user_vehicle,
                    images: user_vehicle_images
                },
            };

        default:
            return state;
    }
}
