import React, { Component } from 'react';
import { Row, Col, Button, Checkbox, message } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
import If from '../../../../components/_if_component';
import VirtualFitting from '../virtualfitting';

export default class ProdDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        };
        this.changeCount = this.changeCount.bind(this);
    }

    changeCount = (type) => {
        this.setState({
            count: (type === 'inc') ? this.state.count + 1 : (this.state.count > 1) ? this.state.count - 1 : 1,
        });
    }

    addToCart = () => {
        const { item, curr_design, curr_variant, registration_number, actions } = this.props;
        if (!curr_variant || !curr_variant.id) {
            message.error('Please select a product variant!!!');
        } else if (!curr_design || !curr_design.id) {
            message.error('Please select a design!!!');
        } else if (!registration_number) {
            message.error('Please enter your vehicle registration number!!');
        } else {
            let cart_item = {
                variant_id: curr_variant.id,
                variant: curr_variant.name,
                product_type_id: curr_design.id,
                product_type: curr_design.name,
                quantity: this.state.count,
                info: registration_number,
                product_id: item.id,
                product_name: item.name,
                product_img: curr_design.image,
                amount: curr_variant.price * this.state.count,
                price: curr_variant.price,
            };
            actions.addToCart(cart_item);
            actions.loadPath('/cart');
        }
    }

    render() {
        const { item, actions, curr_design, curr_variant, registration_number, cart_details } = this.props;
        const cartDisabled = ((!registration_number || registration_number === "") || (curr_design && !curr_design.id) || !curr_variant || (curr_variant && !curr_variant.id));

        let proceed_to_cart = false;
        let cart_item_index = cart_details.cart_item_ids.indexOf(item.id);
        if (cart_item_index > -1) {
            let car_item = cart_details.cart_items.find(cart_item => {
                return cart_item.id === item.id && cart_item.product_type_id === curr_design.id && cart_item.variant_id === curr_variant.id;
            });
            car_item && car_item.id && (proceed_to_cart = true);
        }

        return (
            <Row className="l-pad-15 ProdDetails">
                <Col span={24} className="tagContainer">
                    {item.tags.map((tag, index) => {
                        return (<Button key={index} className="r-mrgn-10 tag">{tag}</Button>);
                    })}
                </Col>
                <Col span={24} className="t-mrgn-10 titleContainer">
                    <Col span={24} className="font-24 name">{item.name}</Col>
                    <Col span={24} className="t-pad-5 flex-row price">
                        <span className={classNames("actualPrice", { 'hasOffer': item.has_offer })}>₹{item.actual_price}</span>
                        <If condition={item.has_offer}>
                            <div className="offerPrice">₹{item.price}</div>
                        </If>
                    </Col>
                    <Col span={24} className="t-pad-5 font-12 description">{item.description}</Col>
                </Col>
                <Col span={24} className="t-mrgn-20">
                    <Col span={24} className="virtualFittingContainer">
                        <VirtualFitting openImageEditor={actions.openImageEditor}/>
                    </Col>
                </Col>
                {curr_design && item.product_types && item.product_types.length > 0 &&
                    <Col span={24} className="t-mrgn-20 designsContainer">
                        <Col span={24} className="font-12 is-font-bold title">Available Designs</Col>
                        <Col span={24} className="flex-row flex-wrap">
                            {item.product_types.map((design) => {
                                return (
                                    <div className={classNames("mrgn-5 is-cursor-ptr design", { 'active': design.id === curr_design.id })}
                                        key={design.id}
                                        style={{ backgroundImage: `url(${design.image})` }}
                                        onClick={() => { actions.handleDesignChange(design); }}
                                    >&nbsp;</div>
                                );
                            })}
                        </Col>
                    </Col>
                }

                {item.variants && item.variants.length > 0 &&
                    <Col span={24} className="t-mrgn-20 variantsContainer">
                        <Col span={24} className="font-12 is-font-bold title">Available Customisations</Col>
                        <table className="full-width variant-table t-mrgn-30">
                            <thead>
                                <tr>
                                    <th/>
                                    <th>Variant</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.variants.map((variant) => {
                                    return (
                                        <tr key={variant.id}>
                                            <td className="checkbox-td"><Checkbox onChange={() => { actions.handleVariantChange(variant); }} checked={curr_variant && curr_variant.id === variant.id}/></td>
                                            <td>{variant.name}</td>
                                            <td className="price-td">₹{variant.price}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </Col>
                }

                <Col span={24} className="t-mrgn-20 cartContainer">
                    <Col span={24} className="font-12 is-font-bold title">Quantity</Col>
                    <Col span={24} className="mrgn-5 flex-row flex-ac is-cursor-ptr counter">
                        <div className="flex-row flex-center icon" onClick={() => { this.changeCount('dec'); }}>-</div>
                        <span className="flex-row flex-center count">{this.state.count}</span>
                        <div className="flex-row flex-center is-cursor-ptr icon" onClick={() => { this.changeCount('inc'); }}>+</div>
                        { !proceed_to_cart &&
                            <Button className="l-mrgn-20 flex-row flex-center btn-fill-violet"
                                disabled={cartDisabled}
                                onClick={() => { this.addToCart(); }}
                            >
                                <i className="r-mrgn-20 material-icons">shopping_cart</i>
                                <span className="font-16" >ADD TO CART</span>
                            </Button>
                        }
                        { proceed_to_cart &&
                            <Button className="l-mrgn-20 flex-row flex-center btn-fill-violet"
                                disabled={cartDisabled}
                                onClick={() => { actions.loadPath('/cart'); }}
                            >
                                <i className="r-mrgn-20 material-icons">shopping_cart</i>
                                <span className="font-16" >PROCEED TO CART</span>
                            </Button>
                        }
                    </Col>
                    <If condition={cartDisabled}>
                        <Col span={24} className="t-mrgn-10 error-text">* Dont forget to add your registration number, choose a design and product variant before adding to cart!</Col>
                    </If>
                </Col>
            </Row>
        );
    }
}

ProdDetails.propTypes = {
    item: PropTypes.object.isRequired,
    registration_number: PropTypes.string,
    cart_details: PropTypes.object,
    curr_design: PropTypes.object,
    curr_variant: PropTypes.object,
    actions: PropTypes.object
};
