import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Icon, message, Modal } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

const FormItem = Form.Item;
const { TextArea } = Input;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default class AddressDetails extends Component {
    constructor() {
        super();
        this.validatePincode = this.validatePincode.bind(this);

        this.state = {
            pincodeValidationError: false,
            pincodeErrorMsg: "",
            show_message_modal: false
        };

        this.loading_timer = false;
    }

    componentDidMount() {
        const { cart_details, form } = this.props;
        for (let feild in cart_details.shipping_address) {
            form.setFieldsValue({
                [feild]: cart_details.shipping_address[feild]
            });
        }
        form.validateFields(); // To disabled submit button at the beginning.
        if (cart_details.order_details && cart_details.order_details.id && !cart_details.razorpay_id) {
            if (cart_details.order_details.payment_status === 'UNPAID' || cart_details.order_details.payment_status === 'FAILED') {
                const title = 'Your last payment attempt failed?';
                const content = `Your last attempt for payment failed for ${cart_details.cart_items.length} items. Do you want to retry?`;
                this.showConfirmPopup('confirm', title, content, this.retryPayment);
            } else {
                this.props.actions.clearCart();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const loaders = this.props.cart_details.loaders;
        const next_loaders = nextProps.cart_details.loaders;
        if (loaders !== next_loaders) {
            let title, content;
            this.setState({
                show_message_modal: false,
                message: ""
            }, () => {
                if (next_loaders.order_updating) {
                    this.setState({
                        show_message_modal: true,
                        message: "Processing you payment..."
                    });
                } else if (next_loaders.order_updated) {
                    title = 'Your Order has been placed';
                    content = `Thank you for placing your oder. Your order will be delivered in next 7-10 business working days. Please note down your order id - ${nextProps.cart_details.order_details.id.toUppercase()} and your payment reference id- ${nextProps.cart_details.razorpay_id.toUppercase()}. In case of any clarifications, contact (+91)9928683832/orbiznumberplates@gmail.com`;
                    this.showConfirmPopup('success', title, content, this.props.actions.clearCart(), this.props.actions.clearCart());
                } else if (next_loaders.order_update_err) {
                    title = 'Your paymeny status updation failed!';
                    content = `Sorry for the inconvienience caused. Your money, if any deducted,  will be refunded in next 7-10 business working days. Please note down your order id- ${nextProps.cart_details.order_details.id.toUppercase()} and your payment reference id - ${nextProps.cart_details.razorpay_id.toUppercase()}. In case of any clarifications, contact (+91)9928683832/orbiznumberplates@gmail.com`;
                    this.showConfirmPopup('error', title, content, this.props.actions.clearCart(), this.props.actions.clearCart());
                }

                if (next_loaders.order_adding) {
                    this.setState({
                        show_message_modal: true,
                        message: "Placing your Order..."
                    });
                } else if (next_loaders.order_added) {
                    this.setState({
                        show_message_modal: true,
                        message: "Redirecting to payment gateway.."
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                show_message_modal: false,
                                message: ""
                            });
                        }, 2000);
                    });
                } else if (next_loaders.order_add_err) {
                    this.showConfirmPopup('error', 'Error', 'Placing order failed! Please retry!');
                }
            });
        }
    }

    showConfirmPopup = (type, title, content, okFunc, cancelFunc) => {
        const popup = Modal[type];
        popup({
            title: title,
            content: content,
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                okFunc && okFunc();
            },
            onCancel() {
                cancelFunc && cancelFunc();
            }
        });
    }

    validatePincode = (value) => {
        if (isNaN(value)) {
            this.setState({
                pincodeValidationError: true,
                pincodeErrorMsg: "Input should be a number"
            });
        } else if (value.toString().length !== 6) {
            this.setState({
                pincodeValidationError: true,
                pincodeErrorMsg: "pincode must have 6 digit"
            });
        } else {
            this.setState({
                pincodeValidationError: false,
                pincodeErrorMsg: ""
            });
        }
    }

    handleInputChange = (event) => {
        if (event.target.name === "pincode") {
            this.validatePincode(event.target.value);
        }
        this.props.form.setFieldsValue({
            [event.target.name]: event.target.value
        });
        let shipping_address = {
            ...this.props.cart_details.shipping_address,
            [event.target.name]: event.target.value
        };
        this.props.actions.updateShippingDetails(shipping_address);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                const { cart_details, actions } = this.props;
                let order = {
                    order_items_attributes: cart_details.cart_items,
                    shipping_address_attributes: cart_details.shipping_address
                };
                actions.createOrder(order);
            } else {
                message.error('Please enter/validate all the feilds!');
            }
        });
    }

    retryPayment = () => {
        const { cart_details, actions } = this.props;
        let order = {
            ...cart_details.order_details,
            total_count: cart_details.cart_items.length,
            email: cart_details.shipping_address.email,
            phone: cart_details.shipping_address.phone
        };
        actions.showPaymentPage(order);
    }

    render() {
        const { cart_details } = this.props;
        const { pincodeValidationError, pincodeErrorMsg } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const emailError = isFieldTouched('email') && getFieldError('email');
        const phoneError = isFieldTouched('phone') && getFieldError('phone');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const pincodeError = isFieldTouched('pincode') && getFieldError('pincode');
        const cityError = isFieldTouched('city') && getFieldError('city');
        const stateError = isFieldTouched('state') && getFieldError('state');
        const countryError = isFieldTouched('country') && getFieldError('country');
        const show_retry = (cart_details.order_details && cart_details.order_details.id && (cart_details.order_details.payment_status === 'UNPAID' || cart_details.order_details.payment_status === 'FAILED') && !cart_details.razorpay_id);

        return (
            <Row className="lr-pad-15 b-mrgn-10 flex-column flex-ac CartSection AddressDetails">
                <Modal
                    className="modalStyle"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.show_message_modal}
                    title={null}
                    closable={false}
                    maskClosable={false}
                    footer={null}
                    width={'auto'}
                >
                    <div className="tb-pad-5 lr-pad-15 flex-row flex-center content">
                        <Icon type="loading" />
                        <span className="l-mrgn-10">{this.state.message}</span>
                    </div>
                </Modal>
                <Col xs={24} className="pad-15 sectionHeader">Shipping Address</Col>
                <Col xs={24} className="pad-15 sectionContent">
                    <div className="full-width">
                        <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <FormItem validateStatus={emailError ? "error" : ""} help={emailError || ''}>
                                {
                                    getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email', message: 'The input is not valid E-mail!',
                                        }, {
                                            required: true, message: 'Please input your E-mail!',
                                        }],
                                    })(
                                        <Input placeholder="Email" className="font-12 height-30 font-white bg-black" name="email" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={phoneError ? "error" : ""} help={phoneError || ''}>
                                {
                                    getFieldDecorator('phone', {
                                        rules: [
                                            { required: true, message: 'Please enter your phone number! ' },
                                            { len: 10, message: 'Phone number should be 10 digits!' },
                                        ]
                                    })(
                                        <Input addonBefore={"+91"} placeholder="Phone Number" className="font-12 height-30 font-white bg-black" type="number" name="phone" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={addressError ? "error" : ""} help={addressError || ''}>
                                {
                                    getFieldDecorator('address', {
                                        rules: [{ required: true, message: 'Please enter shipping address' }],
                                    })(
                                        <TextArea placeholder="Enter shipping address" className="font-12 font-white bg-black" rows={3} name="address" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={pincodeError ? "error" : (pincodeValidationError ? "error" : "")} help={pincodeError ? pincodeError : (pincodeValidationError ? pincodeErrorMsg : '')}>
                                {
                                    getFieldDecorator('pincode', {
                                        rules: [
                                            { required: true, message: 'Please enter pincode!' }
                                        ],
                                    })(
                                        <Input placeholder="Pincode" className="font-12 height-30 font-white bg-black" name="pincode" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={cityError ? "error" : ""} help={cityError || ''}>
                                {
                                    getFieldDecorator('city', {
                                        rules: [{ required: true, message: 'Please enter city' }],
                                    })(
                                        <Input placeholder="City" className="font-12 height-30 font-white bg-black" name="city" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={stateError ? "error" : ""} help={stateError || ''}>
                                {
                                    getFieldDecorator('state', {
                                        rules: [{ required: true, message: 'Please enter state' }],
                                    })(
                                        <Input placeholder="State" className="font-12 height-30 font-white bg-black" name="state" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={countryError ? "error" : ""} help={countryError || ''}>
                                {
                                    getFieldDecorator('country', {
                                        rules: [{ required: true, message: 'Please enter country' }],
                                    })(
                                        <Input placeholder="Country" className="font-12 height-30 font-white bg-black" name="country" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem className="is-no-b-mrgn">
                                <div className="flex-row flex-jc t-pad-5">
                                    <Button size="large" className="btn-fill-violet" htmlType="submit" disabled={hasErrors(getFieldsError()) || cart_details.cart_item_ids.length === 0 || cart_details.loaders.order_adding} >
                                        {cart_details.loaders.order_adding && <Icon type="loading" />}SAVE & CONTINUE
                                    </Button>
                                    {show_retry &&
                                        <Button size="large" type="danger" className="l-mrgn-5 btn-danger" disabled={cart_details.loaders.order_updating} onClick={() => { this.retryPayment(); }}>
                                            RETRY PAYMENT
                                        </Button>
                                    }
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}

AddressDetails.propTypes = {
    cart_details: PropTypes.object,
    actions: PropTypes.object,
    form: PropTypes.object
};

