import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
// import If from '../../../../components/_if_component';

export default class CartDetails extends Component {
    render() {
        return (
            <Row className="lr-pad-15 b-mrgn-10 flex-column flex-ac CartSection CartDetails">
                <Col xs={24} className="pad-15 sectionHeader">Review Cart</Col>
                <Col xs={24} className="sectionContent">&nbsp;</Col>
                <Col xs={24} className="tb-pad-10 sectionFooter flex-row flex-jsa">
                    <div className="flex-column flex-center subtotal">
                        <div className="">Subtotal</div>
                        <div className="">Rs. 323</div>
                    </div>
                    <div className="flex-column flex-center subtotal">
                        <div className="">Shipping</div>
                        <div className="">Rs. 0</div>
                    </div>
                    <div className="flex-column flex-center subtotal">
                        <div className="">Total</div>
                        <div className="">Rs. 323</div>
                    </div>
                </Col>
            </Row>
        );
    }
}

CartDetails.propTypes = {
    cart_details: PropTypes.object,
    actions: PropTypes.object
};

