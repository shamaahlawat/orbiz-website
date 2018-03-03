const home_page_data = localStorage.getItem('home_page_data') ? JSON.parse(localStorage.getItem('home_page_data')) : [];

const initialStates = {
    page_details: {
        lang: 'en',
        device_data: {},
        current_page: undefined,
        popup_user: {},
        home_page_data,
        product_details_page: {
            editor_vehicle_type: 'saved'
        },
        loaders: {
            page_loading: false,
            page_loaded: false,
            page_load_err: false,
            carousal_loading: false,
            carousal_load_err: false
        }
    },
};

export default initialStates;
