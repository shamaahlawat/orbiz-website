const primary_carousal = localStorage.getItem('primary_carousal') ? JSON.parse(localStorage.getItem('primary_carousal')) : [];
const secondary_carousal = localStorage.getItem('secondary_carousal') ? JSON.parse(localStorage.getItem('secondary_carousal')) : [];

const initialStates = {
    page_details: {
        lang: 'en',
        device_data: {},
        current_page: undefined,
        popup_user: {},
        primary_carousal,
        secondary_carousal,
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
