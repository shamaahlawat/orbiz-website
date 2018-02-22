import React, { Component } from 'react';
import { Row, Col, InputNumber } from 'antd';
// import PropTypes from 'prop-types';

import './index.scss';
// import If from '../../../../components/_if_component';

export default class CartItem extends Component {
    render() {
        return (
            <Row>
                <Col xs={24} className="flex-row flex-jsb pad-10 CartItem">
                    <div className=" flex-row">
                        <div className="itemImageBox">
                            <img src="" alt="" className="img-contain" />
                        </div>
                        <div className="lr-pad-10">
                            <p className="font-primary">Orbiz item</p>
                            <p className="font-12">Registration Number: BH 11 AJ 6069</p>
                            <div className="full-width flex-row t-pad-5">
                                <div className="flex-column flex-jc">
                                    <p className="r-pad-10 font-12">Quantity :</p>
                                </div>
                                <InputNumber className="bg-black inputCounter" min={1} defaultValue={1} />
                            </div>
                        </div>
                    </div>
                    <div className="lr-pad-5 flex-row flex-center">
                        <p className="font-16 font-green-dark is-font-medium">$300</p>
                    </div>
                </Col>
            </Row>
        );
    }
}


