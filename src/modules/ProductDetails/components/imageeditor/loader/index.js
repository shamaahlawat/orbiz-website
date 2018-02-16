import React, { Component } from 'react';
import { Row, Col } from 'antd';

import '../index.scss';

export default class ImageEditorLoader extends Component {
    render() {
        return (
            <Row type="flex" justify="center" className="is-relative ImageEditor loader">
                <Col span={24} className="is-no-mrgn ant-card-loading-block imageContainer">&nbsp;</Col>
            </Row>
        );
    }
}

