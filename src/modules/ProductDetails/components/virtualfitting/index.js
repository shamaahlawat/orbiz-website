import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
// import If from '../../../../components/_if_component';

export default class VirtualFitting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { actions } = this.props;
        return (
            <Row type="flex" align="center" className="pad-15 virtualFitting">
                <Col span={24} className="font-12 is-font-bold title">Virtual Fitting:</Col>
                <Col span={24} className="flex-row flex-center flex-wrap selectors">
                    <Button className="font-12 btn-fill-black mrgn-5" onClick={() => { actions.openImageEditor(); }}>Try your registration number</Button>
                    <Button className="font-12 btn-fill-black mrgn-5" onClick={() => { actions.openImageEditor(); }}>Try on your vehicle model</Button>
                    <Button className="font-12 btn-fill-black mrgn-5" onClick={() => { actions.openImageEditor(); }}>Try on your vehicle</Button>
                </Col>
            </Row>
        );
    }
}

VirtualFitting.propTypes = {
    vehicles: PropTypes.object,
    designs: PropTypes.object,
    actions: PropTypes.object
};

