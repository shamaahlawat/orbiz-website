import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
// import If from '../../../../components/_if_component';

import CartItem from './cartitem';

export default class CartDetails extends Component {
    render() {
        const { cart_details, actions } = this.props;
        return (
            <Row className="lr-pad-15 b-mrgn-10 flex-column flex-ac CartSection CartDetails">
                <Col xs={24} className="pad-15 sectionHeader">Review Cart</Col>
                <Col xs={24} className="flex-column sectionContent">
                    {
                        cart_details.cart_items.map((item, index) => {
                            return (
                                <Col xs={24} className="cartItemContainer" key={index}>
                                    <CartItem item={item} index={index} actions={actions} />
                                </Col>
                            );
                        })
                    }
                    {cart_details.cart_items.length == 0 &&
                        <span className="pad-15 t-mrgn-40 emptyContent">Seems like you haven't chose anything to make your vehicle cool. Add some of our prouducts to your cart! </span>
                    }
                </Col>
                <Col xs={24} className="tb-pad-10 sectionFooter flex-row flex-jsa">
                    <div className="l-pad-12 flex-column full-flex flex-center subtotal">
                        <div className="">&nbsp;</div>
                        <div className="">&nbsp;</div>
                    </div>
                    <div className="lr-pad-15 flex-column full-flex flex-center subtotal">
                        <div className="">&nbsp;</div>
                        <div className="">&nbsp;</div>
                    </div>
                    {cart_details.total_amount > 0 &&
                        <div className="r-pad-15 flex-column full-flex flex-jc is-text-right subtotal">
                            <div className="title">Total Amount</div>
                            <div className="price">₹{cart_details.total_amount}</div>
                        </div>
                    }
                </Col>
            </Row>
        );
    }
}

CartDetails.propTypes = {
    cart_details: PropTypes.object,
    actions: PropTypes.object
};

