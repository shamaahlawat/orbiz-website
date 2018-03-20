import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Select, Button, Upload, Icon, message} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Option = Select.Option;

import './index.scss';
import * as pageActions from '../../../../data/redux/page_details/actions';
import * as itemActions from '../../../../data/redux/item_details/actions';
import * as vehicleActions from '../../../../data/redux/vehicle_details/actions';
import If from '../../../../components/_if_component';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        item_details: state.item_details,
        vehicle_details: state.vehicle_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, itemActions, vehicleActions), dispatch)
    };
}

class VirtualFitting extends Component {
    constructor(props) {
        super(props);
        let current_vehicle;
        let front_img_list = JSON.parse(localStorage.getItem('front_file')) ? [JSON.parse(localStorage.getItem('front_file'))] : [];
        let rear_img_list = JSON.parse(localStorage.getItem('rear_file')) ? [JSON.parse(localStorage.getItem('rear_file'))] : [];
        let current_user_vehicle = {
            complete: false,
            name: null,
            type: 'user',
            vehicle_models: [
                {
                    id: 0,
                    name: 'User Vehicle',
                    front_image: front_img_list,
                    rear_image: rear_img_list
                }
            ]
        };
        this.state = {
            view_mode: 'registration_number',
            type: undefined,
            model: undefined,
            current_vehicle,
            front_img_list,
            rear_img_list,
            current_user_vehicle
        };

        this.processFrontFile = this.processFrontFile.bind(this);
        this.processRearFile = this.processRearFile.bind(this);
    }

    registrationEntered = (registration_number) => {
        let regex = new RegExp("^[0-9a-zA-Z \b]+$");
        let numRegEx = new RegExp("[0-9]{1,4}$");
        if (!regex.test(registration_number)) {
            registration_number = registration_number.replace(/[^0-9a-zA-Z \b]+/, "")
        }
        registration_number = registration_number.substring(0, 14);

        let parts = registration_number.split(" ");
        let registration_number_err = (parts.length > 4 || registration_number.length === 0 || !numRegEx.test(parts[parts.length - 1]));
        this.setState({
            registration_number_err
        });
        this.props.actions.updateRegistrationNumber(registration_number.toUpperCase());
    }

    setMode = (view_mode) => {
        let current_user_vehicle, current_vehicle, front_img_list = [], rear_img_list = [];
        if (view_mode === 'user_vehicle_upload') {
            if (this.props.vehicle_details.current_vehicle && this.props.vehicle_details.current_vehicle.type === 'user') {
                //prepopulating upload image details if present
                current_user_vehicle = this.props.vehicle_details.current_vehicle;
            } else {
                front_img_list = [JSON.parse(localStorage.getItem('front_file'))];
                rear_img_list = [JSON.parse(localStorage.getItem('rear_file'))];
                current_user_vehicle = {
                    complete: false,
                    name: null,
                    type: 'user',
                    vehicle_models: [
                        {
                            id: 0,
                            name: 'User Vehicle',
                            front_image: front_img_list,
                            rear_image: rear_img_list
                        }
                    ]
                };
            }
        } else {
            current_vehicle = (this.props.vehicle_details.current_vehicle && this.props.vehicle_details.current_vehicle.type !== 'user') ? this.props.vehicle_details.current_vehicle : undefined;
        }
        this.setState({
            view_mode,
            type: undefined,
            model: undefined,
            current_vehicle,
            current_user_vehicle
        });
    }

    handleTypeChange = (value) => {
        this.props.actions.getVehicles({ vehicle_type: value });
        this.props.actions.updateCurrentVehicle();
        this.setState({
            type: value,
            model: undefined
        });
    }

    handleModelChange = (value) => {
        let current_vehicle = this.props.vehicle_details.vehicle_list.find((vehicle) => {
            return vehicle.id === parseInt(value, 10);
        });
        if (current_vehicle && current_vehicle.id) {
            this.setState({
                model: value,
                current_vehicle
            });
        } else {
            this.setState({
                model: undefined,
                current_vehicle: undefined
            });
            message.error('Something went wrong! Try again!');
        }
    }

    processFrontFile = (e) => {
        let self = this;
        let reader = new FileReader();
        reader.fileName = e.name;
        reader.onload = function (event) {
            let img = event.target.result;
            let imgName = event.target.fileName;
            let user_vehicle_model = [...self.state.current_user_vehicle.vehicle_models];
            user_vehicle_model[0].front_image = img;
            user_vehicle_model[0].front_name = imgName;
            let complete = !!user_vehicle_model[0].front_image && !!user_vehicle_model[0].rear_image;
            self.setState({
                current_user_vehicle: {
                    ...self.state.current_user_vehicle,
                    name: `Uploaded on ${new Date()}`,
                    complete,
                    vehicle_models: user_vehicle_model
                }
            });
            let front_file = {
                uid: e.uid,
                name: e.name,
                lastModified: e.lastModified
            };
            localStorage.setItem('front_file', JSON.stringify(front_file));
        };
        reader.readAsDataURL(e);
        return false;
    }

    onFrontFileRemoved = () => {
        let self = this;
        let user_vehicle_model = [...self.state.current_user_vehicle.vehicle_models];
        user_vehicle_model[0].front_image = null;
        user_vehicle_model[0].front_name = null;
        self.setState({
            current_user_vehicle: {
                ...self.state.current_user_vehicle,
                name: `Uploaded on ${new Date()}`,
                complete: false,
                vehicle_models: user_vehicle_model
            }
        });
        localStorage.removeItem('front_file');
        this.props.actions.updateCurrentVehicle();
    }

    processRearFile = (e) => {
        let self = this;
        let reader = new FileReader();
        reader.fileName = e.name;
        reader.onload = function (event) {
            let img = event.target.result;
            let imgName = event.target.fileName;
            let user_vehicle_model = [...self.state.current_user_vehicle.vehicle_models];
            user_vehicle_model[0].rear_image = img;
            user_vehicle_model[0].rear_name = imgName;
            let complete = !!user_vehicle_model[0].front_image && !!user_vehicle_model[0].rear_image;
            self.setState({
                current_user_vehicle: {
                    ...self.state.current_user_vehicle,
                    name: `Uploaded on ${new Date()}`,
                    complete,
                    vehicle_models: user_vehicle_model
                }
            });
            let rear_file = {
                uid: e.uid,
                name: e.name,
                lastModified: e.lastModified
            };
            localStorage.setItem('rear_file', JSON.stringify(rear_file));
        };
        reader.readAsDataURL(e);
        return false;
    }

    onRearFileRemoved = () => {
        let self = this;
        let user_vehicle_model = [...self.state.current_user_vehicle.vehicle_models];
        user_vehicle_model[0].rear_image = null;
        user_vehicle_model[0].rear_name = null;
        self.setState({
            current_user_vehicle: {
                ...self.state.current_user_vehicle,
                name: `Uploaded on ${new Date()}`,
                complete: false,
                vehicle_models: user_vehicle_model
            }
        });
        localStorage.removeItem('rear_file');
        this.props.actions.updateCurrentVehicle();
    }

    openImageEditor = (type) => {
        let current_vehicle = (type === 'user') ? this.state.current_user_vehicle : this.state.current_vehicle;
        this.props.actions.updateCurrentVehicle(current_vehicle);
        this.props.openImageEditor();
    }

    openFontEditor = () => {
        this.props.openImageEditor('font');
    }

    render() {
        const { vehicle_details } = this.props;
        const model_btn_active = this.state.model && this.state.current_vehicle;
        const user_btn_active = this.state.current_user_vehicle && this.state.current_user_vehicle.complete;
        return (
            <Row type="flex" align="center" className="pad-15 virtualFitting">
                <Col span={24} className="font-12 is-font-bold title">Virtual Fitting:</Col>
                <Col span={24} className="flex-row flex-center flex-wrap selectors">
                    <Button className={classNames("font-12 btn-fill-black lr-mrgn-10 tb-mrgn-10", { active: this.state.view_mode === 'registration_number' })} onClick={() => { this.setMode('select_model'); }}>Registration number</Button>
                    <Button className={classNames("font-12 btn-fill-black lr-mrgn-10 tb-mrgn-10", { active: this.state.view_mode === 'select_model' })} onClick={() => { this.setMode('select_model'); }}>Try on your vehicle model</Button>
                    <Button className={classNames("font-12 btn-fill-black tb-mrgn-10", { active: this.state.view_mode === 'user_vehicle_upload' })} onClick={() => { this.setMode('user_vehicle_upload'); }}>Try on your vehicle</Button>
                </Col>
                <Col span={24} className="t-pad-15 flex-row flex-center flex-wrap actionsContainer">
                    <If condition={this.state.view_mode === 'registration_number'}>
                        <Row className="full-width actions">
                            <span className="t-pad-10 full-width is-text-left">Enter your registration number</span>
                            <div className="flex-row flex-center flex-wrap regNumInputContainer">
                                <Col xs={8} className="pad-5 is-text-center">
                                    <input className={classNames("font-12 btn-fill-black tb-mrgn-10 regNumInput", { error: this.state.registration_number_err})} value={vehicle_details.registration_number} onChange={(e) => { this.registrationEntered(e.target.value); }} placeholder="Enter your registration number" />
                                </Col>

                                <Col xs={8} className="pad-5 l-mrgn-15 is-text-center">
                                    <Button className="font-12 btn-fill-black"
                                        style={{ padding: '10px 15px', height: 'auto' }}
                                        onClick={() => { this.openFontEditor(); }}
                                        disabled={this.state.registration_number_err}>
                                        View how it looks
                                    </Button>
                                </Col>
                            </div>
                        </Row>
                    </If>
                    <If condition={this.state.view_mode === 'select_model'}>
                        <Row className="full-width actions">
                            <span className="t-pad-10 full-width is-text-left">Select your vehicle type and model</span>
                            <div className="flex-row flex-center uploadContainer">
                                <Col xs={8} className="pad-5 is-text-center">
                                    <Select
                                        style={{ width: "auto", maxWidth: "100%" }}
                                        placeholder="Select type"
                                        optionFilterProp="children"
                                        onChange={(val) => this.handleTypeChange(val)}
                                        value={this.state.type}
                                        notFoundContent="Not Matches Found"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                        {vehicle_details.vehicle_types.map((type) => {
                                            return (
                                                <Option key={type.id} value={type.name}>{type.name}</Option>
                                            );
                                        })}
                                    </Select>
                                </Col>
                                <Col xs={8} className="pad-5 is-text-center">
                                    <Select
                                        showSearch
                                        style={{ width: "auto", maxWidth: "100%" }}
                                        placeholder="Select Modal"
                                        optionFilterProp="children"
                                        onChange={(val) => this.handleModelChange(val)}
                                        value={this.state.model}
                                        notFoundContent="Not Matches Found"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {vehicle_details.loaders.list_loaded && vehicle_details.vehicle_list.map((item) => {
                                            return (<Option key={item.id} value={item.id.toString()}>{item.name}</Option>);
                                        })}

                                        {!vehicle_details.loaders.list_loaded &&
                                            <Option key="0" value="0" disabled><Icon type="loading" /></Option>
                                        }
                                    </Select>
                                </Col>
                                <Col xs={8} className="pad-5 is-text-center">
                                    <Button className="font-12 btn-fill-black"
                                        style={{ padding: '10px 15px', height: 'auto' }}
                                        onClick={() => { this.openImageEditor('modal'); }}
                                        disabled={!model_btn_active}>CONFIRM</Button>
                                </Col>
                            </div>
                        </Row>
                    </If>
                    <If condition={this.state.view_mode === 'user_vehicle_upload'}>
                        <Row className="full-width actions">
                            <span className="t-pad-10 full-width is-text-left">Upload your vehicles front and rear images</span>
                            <div className="tb-pad-5 flex-row flex-jc flex-wrap uploadContainer">
                                <Upload className="flex-column flex-ac flex-wrap" name="front"
                                    listType="text" accept="image/*"
                                    beforeUpload={this.processFrontFile}
                                    onRemove={this.onFrontFileRemoved}
                                    defaultFileList={this.state.front_img_list}
                                >
                                    <Button className="font-12 btn-fill-black mrgn-5"><Icon type="upload" /> Front</Button>
                                </Upload>
                                <Upload className="flex-column flex-ac flex-wrap" name="rear"
                                    listType="text" accept="image/*"
                                    beforeUpload={this.processRearFile}
                                    onRemove={this.onRearFileRemoved}
                                    defaultFileList={this.state.rear_img_list}
                                >
                                    <Button className="font-12 btn-fill-black mrgn-5"><Icon type="upload" /> Rear</Button>
                                </Upload>
                                <Button className="font-12 btn-fill-black mrgn-5" onClick={() => { this.openImageEditor('user'); }} disabled={!user_btn_active}>CONFIRM</Button>
                            </div>
                        </Row>
                    </If>
                </Col>
            </Row>
        );
    }
}

VirtualFitting.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    openImageEditor: PropTypes.func,
    page_details: PropTypes.object,
    item_details: PropTypes.object,
    vehicle_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(VirtualFitting);
