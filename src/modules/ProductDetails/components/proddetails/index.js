import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
import If from '../../../../components/_if_component';
import VirtualFitting from '../virtualfitting';

export default class ProdDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.changeCount = this.changeCount.bind(this);
    }

    changeCount = (type) => {
        this.setState({
            count: (type === 'inc') ? this.state.count + 1 : (this.state.count > 0) ? this.state.count - 1 : 0,
        });
    }

    render() {
        const { item, actions, curr_design } = this.props;

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
                <If condition={item.product_types && item.product_types.length > 0}>
                    <Col span={24} className="t-mrgn-20 designsContainer">
                        <Col span={24} className="font-12 is-font-bold title">Available Designs</Col>
                        <Col span={24} className="flex-row flex-wrap">
                            {item.product_types.map((design) => {
                                return (
                                    <div className={classNames("mrgn-5 is-cursor-ptr design", { 'active': design.id === curr_design.id })}
                                        key={design.id}
                                        style={{ backgroundImage: `url(${design.image})` }}
                                        onClick={() => { actions.handleDesignChange(design); }}>&nbsp;
                                </div>
                                );
                            })}
                        </Col>
                    </Col>
                </If>
                <Col span={24} className="t-mrgn-20 cartContainer">
                    <Col span={24} className="font-12 is-font-bold title">Quantity</Col>
                    <Col span={24} className="mrgn-5 flex-row flex-ac is-cursor-ptr counter">
                        <div className="flex-row flex-center icon" onClick={() => { this.changeCount('dec'); }}>-</div>
                        <span className="flex-row flex-center count">{this.state.count}</span>
                        <div className="flex-row flex-center is-cursor-ptr icon" onClick={() => { this.changeCount('inc'); }}>+</div>
                        <Button className="l-mrgn-20 flex-row flex-center btn-fill-violet">
                            <i className="r-mrgn-20 material-icons">shopping_cart</i>
                            <span className="font-16">ADD TO CART</span>
                        </Button>
                    </Col>
                </Col>
            </Row>
        );
    }
}

ProdDetails.propTypes = {
    item: PropTypes.object.isRequired,
    curr_design: PropTypes.object,
    actions: PropTypes.object
};
