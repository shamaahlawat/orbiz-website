import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Select, Button } from 'antd';
const Option = Select.Option;

import './index.scss';

const plates = [
    { _id: 0, name: "Orbiz German" },
    { _id: 1, name: "Orbiz Spanish" },
    { _id: 2, name: "Orbiz Batman" },
    { _id: 3, name: "Orbiz Special" },
    { _id: 4, name: "Orbiz Dotted" }
];

const designs = [
    { _id: 0, name: "Orbiz Green" },
    { _id: 1, name: "Orbiz Blue" },
    { _id: 2, name: "Orbiz Yellow" },
    { _id: 3, name: "Orbiz Red" },
    { _id: 4, name: "Orbiz Black" }
];

export default class VehicleSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            models: [],
            plates: plates,
            designs: designs,
            disabled: true
        };
        this.handleDesignChange = this.handleDesignChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handlePlateChange = this.handlePlateChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.validateValues = this.validateValues.bind(this);
    }

    handleTypeChange = (value) => {
        let modal = this.props.vehicles.find((item) => {
            return item._id.toString() === value;
        });
        this.setState({
            type: value,
            model: undefined,
            models: modal.models
        }, () => {
            this.validateValues();
        });
    }

    handleModelChange = (value) => {
        this.setState({
            model: value
        }, () => {
            this.validateValues();
        });
    }

    handlePlateChange = (value) => {
        this.setState({
            plate: value
        }, () => {
            this.validateValues();
        });
    }

    handleDesignChange = (value) => {
        this.setState({
            design: value
        }, () => {
            this.validateValues();
        });
    }

    validateValues = () => {
        this.setState({
            disabled: !(this.state.type && this.state.model && this.state.plate && this.state.design)
        });
    }

    render() {
        const { vehicles } = this.props;

        return (
            <Row type="flex" justify="center" align="center" className="flex-wrap VehicleSelectorContainer">
                <div className="lr-pad-15 selectContainer">
                    <Select
                        showSearch
                        style={{ minWidth: 150 }}
                        placeholder="Select Vehicle type"
                        optionFilterProp="children"
                        onChange={(val) => this.handleTypeChange(val)}
                        value={this.state.type}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {vehicles.map((item) => {
                            return (
                                <Option key={item._id} value={item._id.toString()}>{item.type}</Option>
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
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.state.models && this.state.models.map((item) => {
                            return (<Option key={item._id} value={item._id.toString()}>{item.name}</Option>);
                        })}
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
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.state.plates && this.state.plates.map((item) => {
                            return (<Option key={item._id} value={item._id.toString()}>{item.name}</Option>);
                        })}
                    </Select>
                </div>
                <div className="lr-pad-15 selectContainer">
                    <Select
                        showSearch
                        style={{ minWidth: 150 }}
                        placeholder="Select Design"
                        optionFilterProp="children"
                        onChange={(val) => this.handleDesignChange(val)}
                        value={this.state.design}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.state.designs && this.state.designs.map((item) => {
                            return (<Option key={item._id} value={item._id.toString()}>{item.name}</Option>);
                        })}
                    </Select>
                </div>
                <div className="lr-pad-15 selectContainer">
                    <Button className="flex-row flex-center btn-fill-black" disabled={this.state.disabled}>Confirm</Button>
                </div>
            </Row>
        );
    }
}

VehicleSelector.propTypes = {
    vehicles: PropTypes.arrayOf(PropTypes.object)
};

