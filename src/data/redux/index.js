import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page_details from './page_details/reducers';
import item_details from './item_details/reducers';

const rootReducer = combineReducers({
    page_details,
    item_details,
    routing: routerReducer
});

export default rootReducer;
