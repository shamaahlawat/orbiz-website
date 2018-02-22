import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { Affix } from 'antd';

import * as UTILS from './data/config/utils';
import * as pageActions from './data/redux/page_details/actions';
import AppNavbar from './components/appnavbar';
import AppFooter from './components/appfooter';

import './index.scss';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        cart_details: state.cart_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, ), dispatch)
    };
}

class AppContainer extends Component {
    componentWillMount() {
        const systLang = UTILS.getLang();
        this.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
        if (systLang) {
            this.props.actions.setLang(systLang);
        }
        this.timeout = false;
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("resize", function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                self.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
            }, 300);
        });
    }

    navigateTo = (path) => {
        this.props.history.push(path);
    }

    render() {
        const { page_details, cart_details } = this.props;
        const is_mobile = (this.props.page_details.device_data.screen_width < 768);
        const actions = {
            navigateTo: this.navigateTo
        };

        return (
            <div className={classNames(`flex-column full-width full-min-height AppContainer ${page_details.current_page && page_details.current_page.split('/').join("")}`, { "mobile": is_mobile })}>
                <Affix>
                    <AppNavbar page_details={page_details} cart_details={cart_details} actions={actions}/>
                </Affix>
                <div className="MainContentContainer full-flex is-no-lr-pad">
                    {this.props.children}
                </div>
                <AppFooter />
            </div>
        );
    }
}

AppContainer.propTypes = {
    page_details: PropTypes.object,
    cart_details: PropTypes.object,
    actions: PropTypes.object,
    history: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(withRouter(AppContainer));
