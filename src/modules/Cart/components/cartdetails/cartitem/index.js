import React, { Component } from 'react';
import { Row, Col, Icon, Modal, Input } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

import './index.scss';
// import If from '../../../../components/_if_component';

export default class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_editor: false,
            instruction: ""
        };
    }

    openEditor = () => {
        this.setState({
            show_editor: true
        });
    }

    closeEditor = () => {
        this.setState({
            show_editor: false
        });
    }

    handleInstructionInput = (instruction) => {
        this.setState({
            instruction
        });
    }

    editItem = () => {
        this.props.actions.editCartItem({
            ...this.props.item,
            description: this.state.instruction
        }, this.props.index);
        this.closeEditor();
    }

    render() {
        const { item, index, actions } = this.props;

        return (
            <Row>
                <Col xs={24} className="flex-row pad-10 CartItem">
                    <div className="itemImageBox is-cursor-ptr" onClick={() => { actions.loadPath(`/product/details/${item.product_id}`); }}>
                        <img src={item.product_img} alt="" className="img-contain" />
                    </div>
                    <div className="itemDetails full-flex flex-column lr-pad-10">
                        <span className="font-16 font-primary b-pad-5">{item.product_name} - {item.product_type} - {item.variant}</span>
                        <span className="font-12">Registration Number: {item.info}</span>
                        <span className="font-12">Instructions: {item.description} <Icon type="edit" className="font-16 is-cursor-ptr edit-icon" onClick={() => { this.openEditor(); }} /></span>
                        <div className="full-width flex-row flex-ac t-pad-5">
                            <span className="r-pad-10 font-12">Quantity :</span>
                            <span className="mrgn-5 flex-row flex-ac is-cursor-ptr counter">
                                <div className="flex-row flex-center icon" onClick={() => { actions.decQuantity(item, index); }}>-</div>
                                <span className="flex-row flex-center count">{item.quantity}</span>
                                <div className="flex-row flex-center is-cursor-ptr icon" onClick={() => { actions.incQuantity(item, index); }}>+</div>
                            </span>
                        </div>
                    </div>
                    <div className="lr-pad-5 flex-column flex-jsa flex-center right-box">
                        <p className="font-16 font-green-dark is-font-medium">₹{item.amount}</p>
                        <Icon type="delete" className="is-cursor-ptr delete-icon" onClick={() => { actions.removeFromCart(item, index); }} />
                    </div>
                </Col>
                <Modal
                    title="Enter your instructions"
                    visible={this.state.show_editor}
                    onOk={this.editItem}
                    okText="confirm"
                    onCancel={this.closeEditor}
                    cancelText="cancel"
                >
                    <TextArea placeholder="Enter your additional instructions to be taken care of here..." value={this.state.instruction} autosize={{ minRows: 2, maxRows: 6 }} onChange={(e) => { this.handleInstructionInput(e.target.value); }} />
                </Modal>
            </Row>
        );
    }
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    actions: PropTypes.object
};


