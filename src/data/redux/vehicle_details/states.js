const initialStates = {
    vehicle_details: {
        vehicle_list: null,
        current_vehicle: null,
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
