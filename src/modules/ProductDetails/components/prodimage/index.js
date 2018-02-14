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
        const { item } = this.props;
        return (
            <Row type="flex" justify="center" className="lr-pad-15 b-mrgn-10 ProdImage">
                <If condition={!this.state.fullsizeView}>
                    <div className="full-flex animated flipInX imageContainer" style={{ backgroundImage: `url(${item.imageUrl})` }} onClick={this.toggleView}>
                        &nbsp;
                    </div>
                </If>
                <If condition={this.state.fullsizeView}>
                    <div className="animated flipInX fullViewContainer" onClick={this.toggleView}>
                        <img className="itemImage" src={item.imageUrl} alt={item.description} />
                    </div>
                </If>
            </Row>
        );
    }
}

ProdImage.propTypes = {
    item: PropTypes.object.isRequired
}

