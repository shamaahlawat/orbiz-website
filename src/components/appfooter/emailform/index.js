import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Button } from 'antd';
import classNames from 'classnames';


import './index.scss';

const FormItem = Form.Item;


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default class EmailForm extends Component {
    constructor() {
        super();
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.state = {
            email_sending: false
        };
    }

    componentDidMount() {
        this.props.form.validateFields(); // To disabled submit button at the beginning.
    }

    handleEmailSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.props.handleFormSubmit()
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
        return (
            <Row className="emailFormContainer">
                <Col xs={{ span: 24 }}>
                    <Form layout="inline" className="flex-row" onSubmit={this.handleEmailSubmit}>
                        <FormItem className="is-no-r-mrgn full-width emailContainer" validateStatus={emailIdError ? "error" : ""} help={emailIdError || ''} >
                            {
                                getFieldDecorator('emailId', {
                                    rules: [{ required: true, message: "please enter your Email ID. " }, { type: "email", message: "Enter a valid Email ID" }],
                                })(
                                    <Input placeholder="Your Email Address..." className="font-14 lr-pad-15 height-40 setInput" name="email" onChange={this.handleInputChange} />
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <Button className={classNames("height-40 lr-pad-15 font-16 setButton ", { 'btn-fill-black': !hasErrors(getFieldsError()) })} htmlType="submit" icon="caret-right" loading={this.state.email_sending} disabled={hasErrors(getFieldsError())} />
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}


EmailForm.propTypes = {
    form: PropTypes.object,
    handleFormSubmit: PropTypes.func,
};
