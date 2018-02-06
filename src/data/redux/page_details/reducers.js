import actionTypes from '../action_types';
import initialStates from './states';

export default function page_details(state = initialStates.page_details, action) {
    switch (action.type) {
        case actionTypes.SYST_LANG_SET:
            return {
                ...state,
                lang: action.payload.lang
            };

        case actionTypes.DEVICE_DATA_LOADED:
            return {
                ...state,
                device_data: action.payload.device_data
            };

        case actionTypes.PAGE_CHANGED:
            return {
                ...state,
                current_page: action.payload.current_page,
                page_title: action.payload.page_title,
                page_load_error: false,
                user_popup_requested: false,
                popup_user_loaded: false,
                popup_user: {}
            };

        case actionTypes.PAGE_LOAD_ERROR:
            return {
                ...state,
                page_load_error: true
            };

        default:
            return state;
    }
}
