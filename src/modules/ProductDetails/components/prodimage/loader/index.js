import React, { Component } from 'react';
import { Row } from 'antd';

import './index.scss';

export default class ProdImageLoader extends Component {
    render() {
        return (
            <Row type="flex" justify="center" className="lr-pad-15 b-mrgn-10 ProdImage">
                <div className="ant-card-loading-block full-flex imageContainer">&nbsp;</div>
            </Row>
        );
    }
}
