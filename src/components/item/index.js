import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col, Button } from 'antd';

import './index.scss';
import If from '../_if_component';

export default class Item extends Component {

    loadItemDetails = () => {
        this.props.actions.loadPath(`/product/details/${this.props.item.id}`);
    };

    toggleItemFavorite = (e) => {
        this.props.actions.toggleItemFavorite(this.props.item.id);
    };

    render() {
        const { item } = this.props;

        return (
            <Col xs={{ span: 24 }} className="is-relative pad-15 flex-column Item">
                <If condition={item.has_offer}>
                    <div className="font-12 offerTag">OFFER</div>
                </If>
                <Col xs={{ span: 24 }} className="is-relative is-cursor-ptr imageContainer">
                    <img className="itemImage" src={item.image} alt={item.name} />
                    <div className="pad-15 flex-column flex-jsa flex-ac itemDetails">
                        <Button className="flex-row flex-center btn-fill-violet" onClick={this.loadItemDetails}>
                            <i className="material-icons">shopping_cart</i>
                            <span>ADD TO CART</span>
                        </Button>
                        <div className="b-pad-10 seperator">&nbsp;</div>
                        <span onClick={this.loadItemDetails} className="tb-pad-10 font-16 link">Try on your vehicle</span>
                        <span onClick={() => { this.props.actions.toggleItemFavorite(item.id); }}className="tb-pad-10 font-16 link">Add to wishlist</span>
                    </div>
                </Col>
                <Col xs={{ span: 24 }} className="flex-row flex-jsb flex-ac  detailsContainer" >
                    <div className="flex-column is-cursor-ptr itemDetails" onClick={this.loadItemDetails}>
                        <div className="t-pad-10 name">{item.name}</div>
                        <div className="t-pad-5 flex-row price">
                            <span className={classNames("actualPrice", { 'hasOffer': item.has_offer })}>₹{item.actual_price}</span>
                            <If condition={item.price > 0}>
                                <div className="offerPrice">₹{item.price}</div>
                            </If>
                        </div>
                    </div>
                    <div className="flex-row flex-center favorites" >
                        <i className={classNames("is-cursor-ptr material-icons", { 'active': item.is_favorite })} onClick={(e) => { this.toggleItemFavorite(e); }}>{item.is_favorite ? 'favorite' : 'favorite_border'}</i>
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

