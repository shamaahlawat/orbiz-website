import actionTypes from '../action_types';
import * as API from '../../config/api';

export function setLang(lang) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.SYST_LANG_SET,
            payload: {
                lang: lang
            }
        });
    };
}

export function setDeviceData(device_data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.DEVICE_DATA_LOADED,
            payload: {
                device_data: device_data
            }
        });
    };
}

export function pageChanged(page) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.PAGE_CHANGED,
            payload: {
                current_page: page
            }
        });
    };
}

export function getHomePageData() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.HOME_PAGE_LOADING
        });

        API.getHomePageData().then(response => {
            dispatch({
                type: actionTypes.HOME_PAGE_LOADED,
                payload: {
                    home_page_data: response.data
                }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.HOME_PAGE_LOAD_ERR
            });
        });
    };
}

export function getHomeCarousals() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.CAROUSAL_LOADING
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CAROUSAL_LOADED,
                payload: {
                    primary_carousal: [
                        { imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider1.jpg" },
                        { imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider-new-1.jpg" },
                        { imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider4.jpg" },
                        { imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider-new-2.jpg" }
                    ],
                    secondary_carousal: [
                        {
                            subtitle: "Germans are always classy!",
                            product_id: "7e9c85a",
                            title: "Orbiz German Number Plates",
                            description: "Germans are always known for their craftsmanship when it comes to automotives. So does our german number plates. Make your vehicle look world class with just one click.",
                            imageUrl: "//orbiz.in/wp-content/uploads/2018/01/04-min.jpg"
                        },
                        {
                            subtitle: "No, It’s Not just for cars!",
                            product_id: "fb289f6",
                            title: "Orbiz Spanish Number Plates",
                            description: "These Orbiz Spanish number plates are specially made for those who believe in being unique. The uniqueness our spanish plates are providing is sublime. Go, Order your plates today!",
                            imageUrl: "//orbiz.in/wp-content/uploads/2018/01/05-min.jpg"
                        },
                        {
                            subtitle: "For The Super Hero In You!",
                            product_id: "2ad07c0",
                            title: "Orbiz Batman Number Plates",
                            description: "We manufacture custom number plates as per the client’s inclination and taste. Also, you can always get the best number plates which will make your vehicle look incredibly attractive as well as unique.",
                            imageUrl: "//orbiz.in/wp-content/uploads/2018/01/02.jpg"
                        }
                    ]
                }
            });
        }, 1500);
    };
}
