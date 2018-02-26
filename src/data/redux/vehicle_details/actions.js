import actionTypes from '../action_types';
import * as API from '../../config/api';

export function getVehicles() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.VEHICLE_LIST_LOADING
        });

        API.getVehicles().then(response => {
            dispatch({
                type: actionTypes.VEHICLE_LIST_LOADED,
                payload: {
                    vehicle_list: response.data.vehicles
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.VEHICLE_LIST_LOAD_ERR
            });
        });
    };
}

export function getVehicleTypes() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.VEHICLE_TYPE_LOADING
        });

        API.getVehicleTypes().then(response => {
            dispatch({
                type: actionTypes.VEHICLE_TYPE_LOADED,
                payload: {
                    vehicle_types: response.data.vehicle_types
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.VEHICLE_TYPE_LOAD_ERR
            });
        });
    };
}

export function getVehicleDetails(vehicle_id) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.VEHICLE_LOADING
        });

        API.getVehicle({ vehicle_id }).then(response => {
            dispatch({
                type: actionTypes.VEHICLE_LOADED,
                payload: {
                    vehicle_details: response.data.vehicle
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.VEHICLE_LOAD_ERR
            });
        });
    };
}

export function updateRegistrationNumber(registration_number) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.VEHICLE_REGISTRATION_ENTERED,
            payload: {
                registration_number
            }
        });
    };
}
