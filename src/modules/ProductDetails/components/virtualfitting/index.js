import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Form, Select, Radio, Button, Upload, Icon} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormItem = Form.Item;

import './index.scss';
import * as CONSTANTS from '../../../../data/config/constants';
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
        let current_user_vehicle, front_img_list = [], rear_img_list = [];
        if (props.vehicle_details.current_vehicle) {
            //prepopulating upload image details if present
            current_user_vehicle = props.vehicle_details.current_vehicle;
            front_img_list = [JSON.parse(localStorage.getItem('front_file'))];
            rear_img_list = [JSON.parse(localStorage.getItem('rear_file'))];
        } else {
            current_user_vehicle = {
                complete: false,
                name: null,
                type: 'user',
                vehicle_models: [
                    {
                        name: 'User Vehicle',
                        front_image: null,
                        rear_image: null
                    }
                ]
            };
        }
        this.state = {
            view_mode: null,
            current_vehicle: null,
            front_img_list,
            rear_img_list,
            current_user_vehicle
        };

        this.processFrontFile = this.processFrontFile.bind(this);
        this.processRearFile = this.processRearFile.bind(this);
        this.onFrontFileRemoved = this.onFrontFileRemoved.bind(this);
        this.onRearFileRemoved = this.onRearFileRemoved.bind(this);
        this.openImageEditor = this.openImageEditor.bind(this);
    }

    registrationEntered = (registration_number) => {
        this.props.actions.updateRegistrationNumber(registration_number.toUpperCase());
    }

    setMode = (view_mode) => {
        this.setState({
            view_mode
        });
    }

    onTypeSelected = () => {

    }

    onModelSelected = () => {

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
        }
        reader.readAsDataURL(e);
        return false;
    }

    onFrontFileRemoved = (e) => {
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
        this.props.actions.updateCurrentVehicle({});
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
        }
        reader.readAsDataURL(e);
        return false;
    }

    onRearFileRemoved = (e) => {
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
        this.props.actions.updateCurrentVehicle({});
    }

    openImageEditor = (type) => {
        let current_vehicle = (type === 'user') ? this.state.current_user_vehicle : this.state.current_vehicle;
        this.props.actions.updateCurrentVehicle(current_vehicle);
        this.props.openImageEditor();
    }

    render() {
        const { vehicle_details, actions } = this.props;
        return (
            <Row type="flex" align="center" className="pad-15 virtualFitting">
                <Col span={24} className="font-12 is-font-bold title">Virtual Fitting:</Col>
                <Col span={24} className="flex-row flex-center flex-wrap selectors">
                    <input className="font-12 btn-fill-black tb-mrgn-10 regNumInput" value={vehicle_details.registration_number} onChange={(e) => { this.registrationEntered(e.target.value); }} placeholder="Enter your registration number"/>
                    <Button className={classNames("font-12 btn-fill-black lr-mrgn-10 tb-mrgn-10", { active: this.state.view_mode === 'select_model' })} onClick={() => { this.setMode('select_model') }}>Try on your vehicle model</Button>
                    <Button className={classNames("font-12 btn-fill-black tb-mrgn-10", { active: this.state.view_mode === 'user_vehicle_upload'})} onClick={() => { this.setMode('user_vehicle_upload')}}>Try on your vehicle</Button>
                </Col>
                <Col span={24} className="t-pad-15 flex-row flex-center flex-wrap actionsContainer">
                    <If condition={this.state.view_mode === 'select_model'}>
                        <Row className="full-width actions">
                            <span className="t-pad-10 full-width is-text-left">Select your vehicle type and model</span>
                            <div className="flex-row flex-center uploadContainer">
                                <Col xs={8} className="pad-5 is-text-center">
                                    <Select
                                        style={{ width: "auto" }}
                                        placeholder="Select Type"
                                        defaultValue="0"
                                        size="small"
                                    >
                                        <Option value="0">Car</Option>
                                        <Option value="1">Bike</Option>
                                    </Select>
                                </Col>
                                <Col xs={8} className="pad-5 is-text-center">
                                    <Select showSearch
                                        defaultValue="0"
                                        size="small"
                                        style={{ minWidth: "auto" }}
                                        optionFilterProp="children"
                                        placeholder="Select Model"
                                    >
                                        <Option value="0">Tesla S</Option>
                                        <Option value="1">Royal Enfield</Option>
                                    </Select>
                                </Col>
                                <Col xs={8} className="pad-5 is-text-center">
                                    <Button className="font-12 btn-fill-black" onClick={() => { this.openImageEditor('model'); }} disabled={!this.state.current_vehicle}>CONFIRM</Button>
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
                                <Button className="font-12 btn-fill-black mrgn-5" onClick={() => { this.openImageEditor('user'); }} disabled={!this.state.current_user_vehicle.complete}>CONFIRM</Button>
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
