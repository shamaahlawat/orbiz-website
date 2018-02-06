import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as UTILS from './data/config/utils';
import * as pageActions from './data/redux/page_details/actions';
// import AppHeader from './components/appheader';
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
        return (
            <div className="flex-column full-width full-height AppContainer">
                <AppNavbar/>
				<div className="MainContentContainer full-flex is-no-lr-pad">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

AppContainer.propTypes = {
    actions: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AppContainer);
