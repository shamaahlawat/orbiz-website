import React, { Component } from 'react';
import { Row, Modal } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

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
                <div className="full-flex imageContainer" style={{ backgroundImage: `url(${item_image})` }} onClick={this.toggleView}>&nbsp;</div>
                <Modal
                    className="modalStyle"
                    wrapClassName="vertical-center-modal"
                    title={"Product Image"}
                    visible={this.state.fullsizeView}
                    onCancel={this.toggleView}
                    footer={[]}>
                    <img className="itemImage" src={item_image} alt="" />
                </Modal>
            </Row>
        );
    }
}

ProdImage.propTypes = {
    item_image: PropTypes.string
};

