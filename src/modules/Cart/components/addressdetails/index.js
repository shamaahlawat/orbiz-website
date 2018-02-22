import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
// import If from '../../../../components/_if_component';

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
            pincodeValidationStatus: false,
            pincodeErrorMsg: ""
        };
    }

    componentDidMount() {
        this.props.form.validateFields(); // To disabled submit button at the beginning.
    }

    validatePincode = (value) => {
        if (isNaN(value)) {
            this.setState({
                pincodeValidationStatus: true,
                pincodeErrorMsg: "Input should be a number"
            });
        } else if (value.toString().length !== 6) {
            this.setState({
                pincodeValidationStatus: true,
                pincodeErrorMsg: "pincode must have 6 digit"
            });
        } else {
            this.setState({
                pincodeValidationStatus: false,
                pincodeErrorMsg: ""
            });
        }
    }

    handleInputChange = event => {
        if (event.target.name === "pincode") {
            this.validatePincode(event.target.value);
        }
        //write input onchange action here

    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                //write form submit action here
            }
        });
    }


    render() {
        let { pincodeValidationStatus, pincodeErrorMsg } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const addressError = isFieldTouched('address') && getFieldError('address');
        const pincodeError = isFieldTouched('pincode') && getFieldError('pincode');
        const cityNameError = isFieldTouched('cityName') && getFieldError('cityName');
        const stateNameError = isFieldTouched('stateName') && getFieldError('stateName');
        const countryNameError = isFieldTouched('countryName') && getFieldError('countryName');

        return (
            <Row className="lr-pad-15 b-mrgn-10 flex-column flex-ac CartSection AddressDetails">
                <Col xs={24} className="pad-15 sectionHeader">Shipping Address</Col>
                <Col xs={24} className="pad-15 sectionContent">
                    <div className="full-width">
                        <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <FormItem validateStatus={addressError ? "error" : ""} help={addressError || ''}>
                                {
                                    getFieldDecorator('address', {
                                        rules: [{ required: true, message: 'please enter shipping address' }],
                                    })(
                                        <TextArea placeholder="Enter shipping address" className="font-14 font-white bg-black" rows={3} name="address" onChange={this.handleInputChange} />
                                    )
                                }
                            </FormItem>
                            <FormItem  validateStatus={pincodeError ? "error" : (pincodeValidationStatus ? "warning" : "")} help={pincodeError ? pincodeError : (pincodeValidationStatus ? pincodeErrorMsg : '')}>
                            {
                                getFieldDecorator('pincode', {
                                    rules: [{ required: true, message: 'Please enter pincode' }],
                                })(
                                    <Input placeholder="Pincode" className="font-14 height-40 font-white bg-black" name="pincode" onChange={this.handleInputChange} />
                                    )
                            }
                        </FormItem>
                            <FormItem validateStatus={cityNameError ? "error" : ""} help={cityNameError || ''}>
                                {
                                    getFieldDecorator('cityName', {
                                        rules: [{ required: true, message: 'please enter city' }],
                                    })(
                                        <Input placeholder="City" className="font-14 height-40 font-white bg-black" name="city" onChange={this.handleInputChange}/>
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={stateNameError ? "error" : ""} help={stateNameError || ''}>
                                {
                                    getFieldDecorator('stateName', {
                                        rules: [{ required: true, message: 'please enter state' }],
                                    })(
                                        <Input placeholder="State" className="font-14 height-40 font-white bg-black" name="state" onChange={this.handleInputChange}/>
                                    )
                                }
                            </FormItem>
                            <FormItem validateStatus={countryNameError ? "error" : ""} help={countryNameError || ''}>
                                {
                                    getFieldDecorator('countryName', {
                                        rules: [{ required: true, message: 'please enter country' }],
                                    })(
                                        <Input placeholder="Country" className="font-14 height-40 font-white bg-black" name="country" onChange={this.handleInputChange}/>
                                    )
                                }
                            </FormItem>
                            <FormItem className="is-no-b-mrgn">
                                <div className="flex-row flex-jc t-pad-30">
                                    <Button size="large" className={classNames("full-width height-40", { 'btn-fill-violet': !hasErrors(getFieldsError()), 'btn-fill-black': hasErrors(getFieldsError()) })} htmlType="submit" disabled={hasErrors(getFieldsError())} >
                                        Continue
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
    address_details: PropTypes.object,
    actions: PropTypes.object,
    form: PropTypes.object
};

