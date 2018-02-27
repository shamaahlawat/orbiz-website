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
            let numplates_list = action.payload.numplates;
            numplates_list = numplates_list.map((item) => {
                item.is_favorite = (state.favorites.indexOf(item.id) > -1);
                return item;
            });
            localStorage.setItem('numplates_list', JSON.stringify(numplates_list));

            return {
                ...state,
                numplates_list,
                loaders: {
                    ...state.loaders,
                    numplates_loading: false,
                    numplates_load_err: false
                }
            };

        case actionTypes.NUMPLATES_LOAD_ERR:
            return {
                ...state,
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
            let frames_list = action.payload.frames;
            frames_list = frames_list.map((item) => {
                item.is_favorite = (state.favorites.indexOf(item.id) > -1);
                return item;
            });
            localStorage.setItem('frames_list', JSON.stringify(frames_list));
            return {
                ...state,
                frames_list,
                loaders: {
                    ...state.loaders,
                    frames_loading: false,
                    frames_load_err: false
                }
            };

        case actionTypes.FRAMES_LOAD_ERR:
            return {
                ...state,
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
            let current_item = action.payload.item;
            current_item.is_favorite = (state.favorites.indexOf(current_item.id) > -1);
            localStorage.setItem('current_item', JSON.stringify(current_item));
            return {
                ...state,
                current_item,
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

        case actionTypes.TOGGLE_FAVORITE:
            let index = state.favorites.indexOf(action.payload.product_id);
            let favorites;
            if (index > -1) {
                favorites = [
                    ...state.favorites.slice(0, index),
                    ...state.favorites.slice(index + 1)
                ];
            } else {
                favorites = [
                    action.payload.product_id,
                    ...state.favorites
                ];
            }

            const updated_numplates_list = state.numplates_list.map(item => {
                if (item.id === action.payload.product_id) {
                    return {
                        ...item,
                        is_favorite: !item.is_favorite
                    }
                }
                return item;
            });

            const updated_frames_list = state.frames_list.map(item => {
                if (item.id === action.payload.product_id) {
                    return {
                        ...item,
                        is_favorite: !item.is_favorite
                    }
                }
                return item;
            });

            localStorage.setItem('favorites', JSON.stringify(favorites));

            return {
                ...state,
                favorites,
                numplates_list: updated_numplates_list,
                frames_list: updated_frames_list,
                loaders: {
                    ...state.loaders,
                    item_loading: true,
                    item_load_err: false
                }
            };

        default:
            return state;
    }
}
