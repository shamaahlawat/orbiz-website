import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col, Button } from 'antd';

import './index.scss';
import If from '../_if_component';

export default class Item extends Component {

    loadItemDetails = () => {
        this.props.actions.loadItemDetails(`/product/details/${this.props.item._id}`);
    };

    render() {
        const { item } = this.props;

        return (
            <Col xs={{ span: 24 }} className="is-relative pad-15 flex-column is-cursor-ptr Item">
                <If condition={item.hasOffer}>
                    <div className="font-12 offerTag">OFFER</div>
                </If>
                <Col xs={{ span: 24 }} className="is-relative is-cursor-ptr imageContainer">
                    <img className="itemImage" src={item.imageUrl} alt={item.name} />
                    <div className="pad-15 flex-column flex-jsa flex-ac itemDetails">
                        <Button className="flex-row flex-center btn-fill-violet">
                            <a href="#" className="flex-row flex-center full-flex">
                                <i className="material-icons">shopping_cart</i>
                                <span>ADD TO CART</span>
                            </a>
                        </Button>
                        <div className="b-pad-10 seperator">&nbsp;</div>
                        <a href="#" className="tb-pad-10 font-16 link">Try on your vehicle</a>
                        <a href="#" className="tb-pad-10 font-16 link">Add to wishlist</a>
                    </div>
                </Col>
                <Col xs={{ span: 24 }} className="flex-row flex-jsb flex-ac detailsContainer" onClick={this.loadItemDetails}>
                    <div className="flex-column itemDetails">
                        <div className="t-pad-10 name">{item.name}</div>
                        <div className="t-pad-5 flex-row price">
                            <span className={classNames("actualPrice", { 'hasOffer': item.offerPrice > 0 })}>₹{item.price}</span>
                            <If condition={item.offerPrice > 0}>
                                <div className="offerPrice">₹{item.offerPrice}</div>
                            </If>
                        </div>
                    </div>
                    <div className="flex-row flex-center favorites">
                        <i className="is-cursor-ptr material-icons" onClick={() => { this.props.actions.toggleItemFavorite(); }}>favorite_border</i>
                    </div>
                </Col>
            </Col>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object
};

