const numplates_list = localStorage.getItem('numplates_list') ? JSON.parse(localStorage.getItem('numplates_list')) : [];
const all_numplates_list = localStorage.getItem('all_numplates_list') ? JSON.parse(localStorage.getItem('all_numplates_list')) : [];
const frames_list = localStorage.getItem('frames_list') ? JSON.parse(localStorage.getItem('frames_list')) : [];
const current_item = localStorage.getItem('current_item') ? JSON.parse(localStorage.getItem('current_item')) : undefined;
const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

const initialStates = {
    item_details: {
        numplates_list,
        all_numplates_list,
        frames_list,
        current_item,
        favorites,
        loaders: {
            numplates_loading: false,
            numplates_load_err: false,
            frames_loading: false,
            frames_load_err: false,
            item_loading: false,
            item_load_err: false
        }
    }
};

export default initialStates;
