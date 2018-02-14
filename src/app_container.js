import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Affix } from 'antd';

import * as UTILS from './data/config/utils';
import * as pageActions from './data/redux/page_details/actions';
import AppNavbar from './components/appnavbar';

import './index.scss';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
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
    }

    render() {
        const { page_details } = this.props;
        const is_mobile = (this.props.page_details.device_data.screen_width < 768);
        return (
            <div className={classNames("flex-column full-width full-height AppContainer", { "mobile": is_mobile })}>
                <Affix>
                    <AppNavbar page_details={page_details} />
                </Affix>
                <div className="MainContentContainer full-flex is-no-lr-pad">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

AppContainer.propTypes = {
    page_details: PropTypes.object,
    actions: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AppContainer);
