const vehicle_types = localStorage.getItem('vehicle_types') ? JSON.parse(localStorage.getItem('vehicle_types')) : [];
const current_vehicle = localStorage.getItem('current_vehicle') ? JSON.parse(localStorage.getItem('current_vehicle')) : null;
const registration_number = localStorage.getItem('registration_number') ? JSON.parse(localStorage.getItem('registration_number')) : "";

const initialStates = {
    vehicle_details: {
        vehicle_list: [],
        vehicle_types,
        current_vehicle,
        registration_number,
        loaders: {
            list_loading: false,
            list_loaded: false,
            list_load_err: false,
            vehicle_loading: false,
            vehicle_loaded: !!current_vehicle,
            vehicle_load_err: false
        }
    },
};

export default initialStates;
