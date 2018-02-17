import React, { Component } from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
import If from '../../../../components/_if_component';

export default class ProdImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullsizeView: false
        };
    }

    toggleView = () => {
        this.setState({
            fullsizeView: !this.state.fullsizeView
        });
    };

    render() {
        const { item_image } = this.props;
        return (
            <Row type="flex" justify="center" className="lr-pad-15 b-mrgn-10 ProdImage">
                <If condition={!this.state.fullsizeView}>
                    <div className="full-flex imageContainer" style={{ backgroundImage: `url(${item_image})` }} onClick={this.toggleView}>
                        &nbsp;
                    </div>
                </If>
                <If condition={this.state.fullsizeView}>
                    <div className="animated flipInX fullViewContainer" onClick={this.toggleView}>
                        <img className="itemImage" src={item_image} alt="" />
                    </div>
                </If>
            </Row>
        );
    }
}

ProdImage.propTypes = {
    item_image: PropTypes.string.isRequired
};

