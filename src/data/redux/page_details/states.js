const initialStates = {
    page_details: {
        lang: 'en',
        device_data: {},
        current_page: undefined,
        popup_user: {},
        primary_carousal: [],
        secondary_carousal: [],
        loaders: {
            user_popup_loading: false,
            user_popup_loaded: false,
            user_popup_error: false,
            page_load_error: false,
            carousal_loading: false,
            carousal_load_err: false
        }
    },
};

export default initialStates;
