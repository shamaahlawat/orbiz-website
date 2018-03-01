import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { Row, Select, Button, Icon, message } from 'antd';
const Option = Select.Option;

import './index.scss';
// import * as CONSTANTS from '../../../../data/config/constants';
import * as vehicleActions from '../../../../data/redux/vehicle_details/actions';
import * as itemActions from '../../../../data/redux/item_details/actions';

function mapStateToProps(state) {
    return {
        item_details: state.item_details,
        vehicle_details: state.vehicle_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, itemActions, vehicleActions), dispatch)
    };
}

 class VehicleSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: undefined,
            model: undefined,
            plate: undefined
        };
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handlePlateChange = this.handlePlateChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    componentWillMount() {
        this.props.actions.getProducts({ category: 'number' });
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
            this.props.actions.updateCurrentVehicle(current_vehicle);
            this.setState({
                model: value
            });
        } else {
            message.error('Something went wrong! Try again!');
        }
    }

    handlePlateChange = (value) => {
        this.setState({
            plate: value
        });
    }

    loadEditor = () => {
        if (!this.state.plate || !this.state.model || !this.state.plate) {
            message.error('Please select all the feild values');
        } else {
            this.props.history.push(`/product/details/${this.state.plate}/try`);
        }
    };

    render() {
        const { vehicle_details, item_details } = this.props;
        const disabled = !(this.state.type && vehicle_details.current_vehicle && vehicle_details.current_vehicle.id && this.state.plate);

        return (
            <Row type="flex" justify="center" align="center" className="flex-wrap VehicleSelectorContainer">
                <div className="lr-pad-15 selectContainer">
                    <Select
                        style={{ minWidth: 150 }}
                        placeholder="Select Vehicle type"
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
                </div>
                <div className="lr-pad-15 selectContainer">
                    <Select
                        showSearch
                        style={{ minWidth: 150 }}
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
                </div>
                <div className="lr-pad-15 selectContainer">
                    <Select
                        showSearch
                        style={{ minWidth: 150 }}
                        placeholder="Select Number Plate"
                        optionFilterProp="children"
                        onChange={(val) => this.handlePlateChange(val)}
                        value={this.state.plate}
                        notFoundContent="Not Matches Found"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {item_details.all_numplates_list.length > 0 && item_details.all_numplates_list.map((item) => {
                            return (<Option key={item.id} value={item.id.toString()}>{item.name}</Option>);
                        })}
                    </Select>
                </div>
                <div className="lr-pad-15 selectContainer">
                    <Button className="flex-row flex-center btn-fill-black" disabled={disabled} onClick={() => { this.loadEditor();}}>Confirm</Button>
                </div>
            </Row>
        );
    }
}

VehicleSelector.propTypes = {
    history: PropTypes.object,
    vehicle_details: PropTypes.object,
    item_details: PropTypes.object,
    actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VehicleSelector));

