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
            return {
                ...state,
                vehicle_list: action.payload.vehicle_list,
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
                vehicle_list: null,
                loaders: {
                    ...state.loaders,
                    list_loading: false,
                    list_loaded: false,
                    list_load_err: true
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
            return {
                ...state,
                current_vehicle: action.payload.vehicle_details,
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

        default:
            return state;
    }
}
