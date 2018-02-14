import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import './index.scss';

export default class ProdDetailsLoader extends Component {
    render() {
        return (
            <Row className="animated zoomIn loader ProdDetails">
                <Col xs={{ span: 24 }} className="tagContainer">
                    <Button className="ant-card-loading-block">&nbsp;</Button>
                    <Button className="ant-card-loading-block">&nbsp;</Button>
                </Col>
                <Col xs={{ span: 24 }} className="t-mrgn-10 titleContainer">
                    <Col xs={{ span: 13 }} className="ant-card-loading-block clear-right name">&nbsp;</Col>
                    <Col xs={{ span: 6 }} className="ant-card-loading-block clear-both price">&nbsp;</Col>
                    <Col xs={{ span: 23 }} className="ant-card-loading-block clear-both description">&nbsp;</Col>
                </Col>
                <Col xs={{ span: 24 }} className="t-mrgn-20">
                    <Col xs={{ span: 24 }} className="ant-card-loading-block virtualFittingContainer">&nbsp;</Col>
                </Col>
                <Col xs={{ span: 24 }} className="t-mrgn-20 designsContainer">
                    <Col xs={{ span: 8 }} className="ant-card-loading-block clear-right title">&nbsp;</Col>
                    <Col span={24}>
                        <div className="ant-card-loading-block clear-right design">&nbsp;</div>
                        <div className="ant-card-loading-block clear-right design">&nbsp;</div>
                        <div className="ant-card-loading-block clear-right design">&nbsp;</div>
                        <div className="ant-card-loading-block clear-right design">&nbsp;</div>
                        <div className="ant-card-loading-block clear-right design">&nbsp;</div>
                        <div className="ant-card-loading-block clear-right design">&nbsp;</div>
                        <div className="ant-card-loading-block clear-right design">&nbsp;</div>
                    </Col>
                </Col>
                <Col xs={{ span: 24 }} className="t-mrgn-20 cartContainer">
                    <Col xs={{ span: 8 }} className="ant-card-loading-block clear-right title">&nbsp;</Col>
                    <Col span={24} className="flex-row flex-ac">
                        <div className="ant-card-loading-block clear-right icon">&nbsp;</div>
                        <Button className="ant-card-loading-block" />
                        <div className="ant-card-loading-block clear-right icon">&nbsp;</div>
                        <Button shape="circle" className="ant-card-loading-block" />
                    </Col>
                </Col>
            </Row>
        );
    }
}

