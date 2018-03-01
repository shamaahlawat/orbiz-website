import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page_details from './page_details/reducers';
import item_details from './item_details/reducers';
import vehicle_details from './vehicle_details/reducers';
import cart_details from './cart_details/reducers';

const rootReducer = combineReducers({
    page_details,
    item_details,
    vehicle_details,
    cart_details,
    routing: routerReducer
});

export default rootReducer;
