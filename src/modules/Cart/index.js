import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

import * as pageActions from '../../data/redux/page_details/actions';
import * as cartActions from '../../data/redux/cart_details/actions';
import CartDetails from './components/cartdetails';
import AddressDetails from './components/addressdetails';

const CartAddressDetails = Form.create()(AddressDetails);

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        cart_details: state.cart_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, cartActions), dispatch)
    };
}

class Cart extends Component {
    render() {
        return (
            <div className="CartContainer page-container">
                <Row type="flex">
                    <Col span={24} className="text-center">
                        <Col xs={24} sm={12} md={{ span: 12, offset: 3 }} className="cartDetailsContainer">
                            <CartDetails />
                        </Col>
                        <Col xs={24} sm={12} md={{ span: 6 }} className="addressDetailsContainer">
                            <CartAddressDetails />
                        </Col>
                    </Col>
                </Row>
            </div>
        );
    }
}

Cart.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    cart_details: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Cart);
