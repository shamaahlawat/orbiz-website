import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Carousel, Button, Icon } from 'antd';

import './index.scss';

export default class HomeCarousal extends Component {
    constructor (props) {
        super(props);
        this.loadItemDetails = this.loadItemDetails.bind(this);
    }

    loadItemDetails = (id) => {
        this.props.actions.loadPath(`/product/details/${id}`);
    }

    render() {
        const { options, items } = this.props;

        if (this.props.loading || items.length === 0) {
            return (
                <Row className="flex-row flex-center loadingContainer CarousalContainer">
                    <Icon type="loading" style={{ fontSize: 40}} />
                </Row>
            );
        } else if (this.props.type === 'image') {
            return (
                <Row className="CarousalContainer imgCarousal">
                    <Carousel {...options}>
                        {items.map((item, index) => {
                            return (
                                <img className="carousalItem" src={item} key={index} />
                            );
                        })}
                    </Carousel>
                </Row>
            );
        } else {
            return (
                <Row className="homeCarousal CarousalContainer">
                    <Carousel {...options}>
                        {items.map((item, index) => {
                            return (
                                <Col xs={{ span: 24 }} sm={{ span: 20 }} key={index} className="flex-row carousalItem">
                                    <div className="full-flex flex-column flex-jsa flex-ac  textContainer">
                                        <div className="is-text-center word-wrap subtitle">{item.tagline}</div>
                                        <div className="is-text-center font-24 word-wrap title">
                                            <span>{item.title}</span>
                                            <Col xs={{ span: 4, offset: 10 }} className="underline">&nbsp;</Col>
                                        </div>
                                        <div className="is-text-center font-14 word-wrap description">{item.description}</div>
                                        <div className="button">
                                            <Button className="flex-row btn-fill-white" onClick={() => { this.loadItemDetails(item.product_id); }}>SHOP NOW</Button>
                                        </div>
                                    </div>
                                    <div className="mediaContainer" style={{ backgroundImage: `url(${item.image})` }} >
                                        &nbsp;
									</div >
                                </Col>
                            );
                        })}
                    </Carousel>
                </Row>
            );
        }

    }
}

HomeCarousal.propTypes = {
    items: PropTypes.array.isRequired,
    actions: PropTypes.object,
    type: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    options: PropTypes.object
};

