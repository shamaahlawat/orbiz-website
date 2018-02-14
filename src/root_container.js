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
import TryIt from './modules/TryIt';

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
                        <AppContainer history={history} >
                            <Route exact path="/" component={Home} />
                            <Route path={CONSTANTS.appPages.PRODUCT.EXACT}>
                                <Switch>
                                    <Route exact path={`/${CONSTANTS.appPages.PRODUCT}/list`} component={ProductList} />
                                    <Route path={`/${CONSTANTS.appPages.PRODUCT}/details/:product_id`} component={ProductDetails} />
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

