import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
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
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.CART);
    }

    loadPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        const { cart_details, actions } = this.props;
        let actionProps = {
            ...actions,
            loadPath: this.loadPath
        };

        return (
            <div className="CartContainer page-container">
                <Row type="flex">
                    <Col span={24} className="text-center">
                        <Col xs={24} sm={12} md={{ span: 12, offset: 3 }} className="cartDetailsContainer">
                            <CartDetails cart_details={cart_details} actions={actionProps}/>
                        </Col>
                        <Col xs={24} sm={12} md={{ span: 6 }} className="addressDetailsContainer">
                            <CartAddressDetails cart_details={cart_details} actions={actionProps}/>
                        </Col>
                    </Col>
                </Row>
            </div>
        );
    }
}

Cart.propTypes = {
    actions: PropTypes.object,
    history: PropTypes.object,
    page_details: PropTypes.object,
    cart_details: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Cart);
