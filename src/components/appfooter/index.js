import React, { Component } from 'react';
import { Row, Col,Form, Input, Button } from 'antd';

import EmailForm from './emailform';

import './index.scss';

const FooterEmailForm = Form.create()(EmailForm);

export default class AppFooter extends Component {
    constructor() {
        super();
        this.state = {
            email_sending: false
        };
    }

    render() {
        return (
            <Row className="appFooterContainer">
                <Col xs={{ span: 24 }}>
                    <Row >
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 6, offset: 1 }} md={{ span: 5, offset: 1 }} className="height-250 lr-pad-15 tb-pad-20  border-radius-5 box-shadow-dark footerCardContainer">
                            <h3>ssjjds fhjdhs fihie  hfiedhfi e feifiew f hgiqehif erhfqfwefe efjfheiufyi oewfioeifoe  foief</h3>
                        </Col>
                    </Row>
                    <Row className="footerHeaderContainer">
                        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 8 }} md={{ span: 17, offset: 7 }}>
                            <Row className="t-pad-15">
                                <Col xs={{ span: 22, offset:1 }} sm={{ span: 11, offset: 1 }} className="b-pad-20" >
                                    <p className="font-12 font-dark">Stay up to date with the latest trends.</p>
                                    <h1 className="font-white">Sign up for the Newsletter</h1>
                                </Col>
                                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 10, offset: 1 }} className="b-pad-20">
                                    <FooterEmailForm />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="testContent">
                        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 8 }} md={{ span: 17, offset: 7 }} className="height-150 "></Col>
                    </Row>
                    <Row className="">
                        <Col xs={{ span: 24 }} className="height-50 "></Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}


