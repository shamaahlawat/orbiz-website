import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
// import If from '../../../../components/_if_component';
import * as CONSTANTS from '../../../../data/config/constants';
import * as pageActions from '../../../../data/redux/page_details/actions';
import * as itemActions from '../../../../data/redux/item_details/actions';
import * as vehicleActions from '../../../../data/redux/vehicle_details/actions';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        item_details: state.item_details,
        vehicle_details: state.vehicle_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, itemActions, vehicleActions), dispatch)
    };
}

class VirtualFitting extends Component {
    constructor(props) {
        super(props);
    }

    registrationEntered = (registration_number) => {
        this.props.actions.updateRegistrationNumber(registration_number.toUpperCase());
    };

    render() {
        const { vehicle_details } = this.props;
        const disabled = !vehicle_details.user_vehicle.registration_number;
        return (
            <Row type="flex" align="center" className="pad-15 virtualFitting">
                <Col span={24} className="font-12 is-font-bold title">Virtual Fitting:</Col>
                <Col span={24} className="flex-row flex-center flex-wrap selectors">
                    <input className="font-12 btn-fill-black mrgn-5 regNumInput" value={vehicle_details.user_vehicle.registration_number} onChange={(e) => { this.registrationEntered(e.target.value); }} placeholder="Enter your registration number"/>
                    <Button className="font-12 btn-fill-black mrgn-5" onClick={() => { actions.openImageEditor(); }}>Try on your vehicle model</Button>
                    <Button className="font-12 btn-fill-black mrgn-5" onClick={() => { actions.openImageEditor(); }}>Try on your vehicle</Button>
                </Col>
                <Col span={24} className="flex-row flex-center flex-wrap actions">
                </Col>
            </Row>
        );
    }
}

VirtualFitting.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    page_details: PropTypes.object,
    item_details: PropTypes.object,
    vehicle_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(VirtualFitting);
