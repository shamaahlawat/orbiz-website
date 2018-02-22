import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import * as CONSTANTS from './data/config/constants';

import AppContainer from './app_container';
import Home from './modules/Home';
import ProductList from './modules/ProductList';
import ProductDetails from './modules/ProductDetails';
import Cart from './modules/Cart';

import 'antd/dist/antd.css';

ReactGA.initialize("ga-0008-your-id");

function logPageView() {
	ReactGA.pageview(window.location.pathname + window.location.search);
}

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history} onChange={logPageView}>
                    <Switch>
                        <AppContainer>
                            <Route exact path="/" component={Home} />
                            <Route path={`/${CONSTANTS.appPages.PRODUCT}`}>
                                <Switch>
                                    <Route exact path={`/${CONSTANTS.appPages.PRODUCT}/list`} component={ProductList} />
                                    <Route path={`/${CONSTANTS.appPages.PRODUCT}/details/:product_id/try`} component={ProductDetails} />
                                    <Route path={`/${CONSTANTS.appPages.PRODUCT}/details/:product_id`} component={ProductDetails} />
                                    <Route exact path={`/${CONSTANTS.appPages.CART}`} component={Cart} />
                                </Switch>
                            </Route>
                        </AppContainer>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

