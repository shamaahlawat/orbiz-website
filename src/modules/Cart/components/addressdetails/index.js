import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Icon, message } from 'antd';
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
            pincodeErrorMsg: ""
        };

        this.loading_timer = false;
    }

    componentDidMount() {
        for(let feild in this.props.cart_details.shipping_address){
            this.props.form.setFieldsValue({
                [feild] : this.props.cart_details.shipping_address[feild]
            });
        }
        this.props.form.validateFields(); // To disabled submit button at the beginning.
    }

    // componentWillReceiveProps(nextProps) {
    //     const loaders = this.props.cart_details.loaders;
    //     const next_loaders = nextProps.cart_details.loaders;
    //     if (loaders !== next_loaders) {
    //         if (next_loaders.order_adding) {
    //             this.showMessage('loading', 'Placing your Order. Please wait!');
    //         } else if (next_loaders.order_added) {
    //             this.showMessage('loading', 'Redirecting to payment gateway...');
    //         } else if (next_loaders.order_add_err) {
    //             this.showMessage('error', 'Placing order failed! Please retry!');
    //         }
    //     }
    // }

    showMessage = (type, time, message) => {
        if (type === 'loading') {
            message.loading(message, time);
        } else if (type === 'success') {
            message.success(message, time);
        } else {
            message.error(message, time);
        }
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
            [event.target.name] : event.target.value
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

        return (
            <Row className="lr-pad-15 b-mrgn-10 flex-column flex-ac CartSection AddressDetails">
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
                                            { len: 10, message: 'Phone number should be 10 digits!'},
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
                            <FormItem  validateStatus={pincodeError ? "error" : (pincodeValidationError ? "error" : "")} help={pincodeError ? pincodeError : (pincodeValidationError ? pincodeErrorMsg : '')}>
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
                                    <Button size="large" className="btn-fill-violet" htmlType="submit" disabled={hasErrors(getFieldsError()) || cart_details.loaders.order_adding} >
                                        {cart_details.loaders.order_adding && <Icon type="loading" /> }SAVE & CONTINUE
                                    </Button>
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

