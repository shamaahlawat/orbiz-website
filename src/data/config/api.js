import axios from 'axios';

import * as CONSTANTS from './constants';

const method_types = {
    get: "GET",
    post: "POST",
    delete: "DELETE",
    put: "PUT"
};

function getHeaders() {
    let user = localStorage.getItem('user');
    user = user && (user !='undefined') ? JSON.parse(localStorage.getItem('user')) : null;
    let headers = {
        'Content-Type': 'application/json'
    };
    if (user && (user.uid || user._id) && user.hash) {
        headers.uid = user.uid || user._id;
        headers.hash = user.hash;
    }
    return headers;
}

function fetchDataAndProceed(url, method, data) {
    return axios({
        method: method,
        params: method === 'GET' ? data : {},
        data: method !== 'GET' ? data : {},
        url: url,
        baseURL: CONSTANTS.base_url,
        headers: getHeaders(),
        validateStatus: function (status) {
            return ((status >= 200 && status < 300) || status === 412 || status === 401 || status === 403);
        },
    });
}

/*--------------------------- STORE API ------------------------ */

export const getProducts = () => {
    return fetchDataAndProceed('/products.json', method_types.get);
};

export const getProduct = (data) => {
    return fetchDataAndProceed(`/products/${data.product_id}.json`, method_types.get);
};

export const getVehicles = () => {
    return fetchDataAndProceed('/vehicles.json', method_types.get);
};

export const getVehicle = (data) => {
    return fetchDataAndProceed(`/vehicles/${data.vehicle_id}.json`, method_types.get);
};

export const getVehicleTypes = () => {
    return fetchDataAndProceed('/vehicle_types.json', method_types.get);
};

/*------------------------------ FANGIRL API -----------------------*/
