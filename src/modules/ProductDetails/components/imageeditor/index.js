import React, { Component } from 'react';
import { Row, Col, Radio, Select } from 'antd';
import PropTypes from 'prop-types';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

import './index.scss';
// import If from '../../../../components/_if_component';

export default class ImageEditor extends Component {
    constructor(props) {
        super(props);
        this.handleCarView = this.handleCarView.bind(this);
        this.handleCarColor = this.handleCarColor.bind(this);
        this.handleDesign = this.handleDesign.bind(this);
        
        let car_colors = [];
        for (let color in props.vehicle.images) {
            let car_type = { 
                ...props.vehicle.images[color],
                name: color
            };
            car_colors.push(car_type);
        }
        this.state = {
            car_view: 'front',
            curr_car: car_colors[0],
            car_colors,
            curr_design: this.props.design.designs[0]
        };
    }

    handleCarView = (view) => {
        this.setState({
            car_view : view
        });
    }

    handleCarColor = (value) => {
        this.setState({
            curr_car: this.state.car_colors[parseInt(value, 10)]
        });
    }

    handleDesign = (value) => {
        this.setState({
            curr_design: this.props.design.designs[parseInt(value, 10)]
        });
    }

    render() {
        const car_image = (this.state.car_view === 'front') ? this.state.curr_car.front : this.state.curr_car.rear;
        const { design } = this.props;

        return (
            <Row type="flex" justify="center" className="is-relative ImageEditor">
                <Col span={24} className="tb-pad-5 actionsContainer flex-row flex-center">
                    <div className="lr-pad-5 flex-row flex-center selector">
                        <span className="r-mrgn-10 property">View:</span>
                        <RadioGroup onChange={(e) => { this.handleCarView(e.target.value);}} defaultValue="front" size="small">
                            <RadioButton value="front">Front</RadioButton>
                            <RadioButton value="rear">Rear</RadioButton>
                        </RadioGroup>
                    </div>
                    <div className="lr-pad-5 flex-row flex-center selector">
                        <span className="r-mrgn-10 property">Car Color:</span>
                        <Select defaultValue="0" style={{ width: "auto" }} onChange={(e)=>{this.handleCarColor(e);}}>
                            { this.state.car_colors.map((color, index)=>{
                                return(
                                    <Option key={index} value={index.toString()}>{color.name}</Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="lr-pad-5 flex-row flex-center selector">
                        <span className="r-mrgn-10 property">Design:</span>
                        <Select defaultValue="0" style={{ width: "auto" }} onChange={(e)=>{this.handleDesign(e);}}>
                            {design.designs.map((design, index)=>{
                                return(
                                    <Option key={index} value={index.toString()}>{design.name}</Option>
                                );
                            })}
                        </Select>
                    </div>
                </Col>
                <Col span={24} className="is-no-mrgn flex-row flex-center imageContainer">
                    <img src={car_image} />
                </Col>
            </Row>
        );
    }
}

ImageEditor.propTypes = {
    vehicle: PropTypes.object.isRequired,
    design: PropTypes.object.isRequired
};

