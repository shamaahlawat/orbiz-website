import actionTypes from '../action_types';
import initialStates from './states';

let vehicle_list, vehicle_types, current_vehicle, registration_number;

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
            vehicle_list = action.payload.vehicle_list;
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
            vehicle_types = action.payload.vehicle_types;
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
            current_vehicle = action.payload.vehicle_details;
            if (current_vehicle && current_vehicle.name) {
                localStorage.setItem('current_vehicle', JSON.stringify(current_vehicle));
            } else {
                localStorage.removeItem('current_vehicle');
            }
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
            registration_number = action.payload.registration_number;
            localStorage.setItem('registration_number', JSON.stringify(registration_number));
            return {
                ...state,
                registration_number
            };

        default:
            return state;
    }
}
