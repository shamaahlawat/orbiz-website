
const vehicle_list = localStorage.getItem('vehicle_list') ? JSON.parse(localStorage.getItem('vehicle_list')) : [];
const vehicle_types = localStorage.getItem('vehicle_types') ? JSON.parse(localStorage.getItem('vehicle_types')) : [];
const current_vehicle = localStorage.getItem('current_vehicle') ? JSON.parse(localStorage.getItem('current_vehicle')) : null
const registration_number = localStorage.getItem('registration_number') ? JSON.parse(localStorage.getItem('registration_number')) : null;
const user_vehicle_images = localStorage.getItem('user_vehicle_images') ? JSON.parse(localStorage.getItem('user_vehicle_images')) : null;

const initialStates = {
    vehicle_details: {
        vehicle_list,
        vehicle_types,
        current_vehicle: null,
        user_vehicle: {
            registration_number,
            images: user_vehicle_images
        },
        loaders: {
            list_loading: false,
            list_loaded: false,
            list_load_err: false,
            vehicle_loading: false,
            vehicle_loaded: false,
            vehicle_load_err: false
        }
    },
};

export default initialStates;
