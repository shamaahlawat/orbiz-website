import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';

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
                    <Row>
                        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 6, offset: 1 }} md={{ span: 4, offset: 1 }} className="lr-pad-15 tb-pad-20  border-radius-5 box-shadow-dark footerCardContainer">
                            <Row className="b-mrgn-20">
                                <Col xs={{ span: 16, offset: 4 }}>
                                    <img src="https://i0.wp.com/orbiz.in/wp-content/uploads/2017/11/a.png" alt="" className="img-contain" />
                                </Col>
                            </Row>
                            <p className="font-14 font-primary">Follow Us :</p>
                            <div className="b-mrgn-10 flex-row flex-wrap">&nbsp;</div>
                            <p className="font-14 font-primary">Mail Us :</p>
                            <p className="font-12">orbiz automotivez, orbiz arcade, calicut road, NH-17, Malapuram,kerala -673672 </p>
                            <p className="font-12 t-mrgn-10"><span className="font-14 is-uppercase">PHONE : </span> (+91)9928683832</p>
                            <p className="font-12"><span className="font-14">E-MAIL : </span> orbiznumberplates@gmail.com</p>
                        </Col>
                    </Row>
                    <Row className="footerHeaderContainer">
                        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 8 }} md={{ span: 18, offset: 6 }}>
                            <Row className="t-pad-15">
                                <Col xs={{ span: 24 }} sm={{ span: 12 }} className="b-pad-20 lr-pad-15" >
                                    <p className="font-12 font-dark">Stay up to date with the latest trends.</p>
                                    <h1 className="font-white">Sign up for the Newsletter</h1>
                                </Col>
                                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 10, offset: 1 }} className="b-pad-20">
                                    <FooterEmailForm />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="footerBodyContainer">
                        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 8 }} md={{ span: 18, offset: 6 }} className="b-pad-30 ">
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
                                    <Row>
                                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="lr-pad-15">
                                            <p className="font-14 t-mrgn-30 b-mrgn-20">SHOP</p>
                                            <ul className="font-12">
                                                <li>Number plates for Bike</li>
                                                <li>Number plates for Car</li>
                                                <li>Number plates for Supercar</li>
                                                <li>Number plates for Bus</li>
                                                <li>Frames for Car </li>
                                            </ul>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="lr-pad-15">
                                            <p className="font-14 t-mrgn-30 b-mrgn-20">PRODUCT</p>
                                            <ul className="font-12">
                                                <li>Number plates </li>
                                                <li>Frames</li>
                                                <li>Machines and raw materials</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
                                    <Row>
                                        <Col xs={{ span: 24 }} className="lr-pad-15">
                                            <p className="font-14 t-mrgn-30 b-mrgn-20">COMPANY</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="lr-pad-15">
                                            <ul className="font-12">
                                                <li>About</li>
                                                <li>Gallery</li>
                                                <li>Blog</li>
                                                <li>Say Hello</li>
                                            </ul>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="lr-pad-15">
                                            <ul className="font-12">
                                                <li>Terms and Condition </li>
                                                <li>Careers</li>
                                                <li>Site Map</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 24 }} className="lr-pad-15 tb-pad-10">
                            <p className="is-text-center font-14">Copyright © 2018 Orbiz Automotivez.</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}


