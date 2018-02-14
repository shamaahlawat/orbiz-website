const initialStates = {
    item_details: {
        numplates_list: [],
        frames_list: [],
        current_item: undefined,
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
