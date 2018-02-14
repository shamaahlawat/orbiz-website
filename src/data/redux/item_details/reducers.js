import actionTypes from '../action_types';
import initialStates from './states';

export default function item_details(state = initialStates.item_details, action) {
    switch (action.type) {
        case actionTypes.NUMPLATES_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    numplates_loading: true,
                    numplates_load_err: false
                }
            };

        case actionTypes.NUMPLATES_LOADED:
            return {
                ...state,
                numplates_list: action.payload.numplates,
                loaders: {
                    ...state.loaders,
                    numplates_loading: false,
                    numplates_load_err: false
                }
            };

        case actionTypes.NUMPLATES_LOAD_ERR:
            return {
                ...state,
                numplates_list: [],
                loaders: {
                    ...state.loaders,
                    numplates_loading: false,
                    numplates_load_err: true
                }
            };

        case actionTypes.FRAMES_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    frames_loading: true,
                    frames_load_err: false
                }
            };

        case actionTypes.FRAMES_LOADED:
            return {
                ...state,
                frames_list: action.payload.frames,
                loaders: {
                    ...state.loaders,
                    frames_loading: false,
                    frames_load_err: false
                }
            };

        case actionTypes.FRAMES_LOAD_ERR:
            return {
                ...state,
                frames_list: [],
                loaders: {
                    ...state.loaders,
                    frames_loading: false,
                    frames_load_err: true
                }
            };


        case actionTypes.ITEM_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    item_loading: true,
                    item_load_err: false
                }
            };

        case actionTypes.ITEM_LOADED:
            return {
                ...state,
                current_item: action.payload.item,
                loaders: {
                    ...state.loaders,
                    item_loading: false,
                    item_load_err: false
                }
            };

        case actionTypes.ITEM_LOAD_ERR:
            return {
                ...state,
                current_item: undefined,
                loaders: {
                    ...state.loaders,
                    item_loading: false,
                    item_load_err: true
                }
            };


        default:
            return state;
    }
}
