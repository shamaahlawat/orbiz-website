import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
// import If from '../../../../components/_if_component';

export default class AddressDetails extends Component {
    render() {
        return (
            <Row className="lr-pad-15 b-mrgn-10 flex-column flex-ac CartSection AddressDetails">
                <Col xs={24} className="pad-15 sectionHeader">Shipping Address</Col>
                <Col xs={24} className="sectionContent">&nbsp;</Col>
            </Row>
        );
    }
}

AddressDetails.propTypes = {
    address_details: PropTypes.object,
    actions: PropTypes.object
};

