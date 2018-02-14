import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'antd';

import './index.scss';

export default class ItemLoader extends Component {
    render() {
        const { item } = this.props;

        return (
            <Col xs={{ span: 24 }} className="is-relative pad-15 flex-column Item">
                <Col xs={{ span: 24 }} className="is-relative is-cursor-ptr imageContainer">
                    <div className="ant-card-loading-block itemImage">&nbsp;</div>
                </Col>
                <Col xs={{ span: 24 }} className="flex-row flex-jsb flex-ac detailsContainer">
                    <div className="flex-column full-flex itemDetails">
                        <div className="ant-card-loading-block full-flex t-pad-10 name">&nbsp;</div>
                        <div className="ant-card-loading-block full-flex t-pad-5 flex-row price">&nbsp;</div>
                    </div>
                </Col>
            </Col>
        );
    }
}

