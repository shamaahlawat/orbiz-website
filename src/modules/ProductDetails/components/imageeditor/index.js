import React, { Component } from 'react';
import { Row, Col, Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

import './index.scss';

import If from '../../../../components/_if_component';
import ToolsBar from './toolsbar';

export default class ImageEditor extends Component {
    constructor(props) {
        super(props);
        this.handleCarView = this.handleCarView.bind(this);
        this.handleCarColor = this.handleCarColor.bind(this);
        this.handleDesign = this.handleDesign.bind(this);
        this.saveImage = this.saveImage.bind(this);

        let car_colors = [];
        for (let color in props.vehicle.vehicle_models) {
            let car_type = {
                ...props.vehicle.vehicle_models[color],
                name: color
            };
            car_colors.push(car_type);
        }
        this.state = {
            car_view: 'front',
            curr_car: props.vehicle.vehicle_models[0],
            car_colors,
            curr_design: this.props.design.product_types[0],
            numplate_scale: 0.15,
            show_canvas: true,
            curr_position: undefined
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                canvas_loading: true
            }, () => {
                this.setCanvasParams();
            });
        }, 1000);
    }

    setCanvasParams = () => {
        this.setState({
            canvas_loading: false,
            canv_height: this.car_img.clientHeight,
            canv_width: this.car_img.clientWidth
        });
    }

    handleCarView = (view) => {
        this.setState({
            car_view : view
        });
    }

    handleCarColor = (value) => {
        this.setState({
            curr_car: this.props.vehicle.vehicle_models.find(vehicle => vehicle.id === parseInt(value, 10))
        });
    }

    handleDesign = (value) => {
        this.setState({
            curr_design: this.props.design.product_types[parseInt(value, 10)]
        });
    }

    toggleCanvasView = () => {
        this.setState({
            show_canvas: !this.state.show_canvas
        });
    }

    onScaleChange = (numplate_scale) => {
        this.setState({
            numplate_scale
        });
    }

    onImageDragged = (curr_position) => {
        this.setState({
            curr_position
        });
    }

    saveImage = () => {
        if (this.editor && this.state.show_canvas) {
            const canvas = this.editor.getImage();
            // let context = canvas.getContext('2d');

            let base_image = new Image();
            base_image.src = (this.state.car_view === 'front') ? this.state.curr_car.front : this.state.curr_car.rear;
            base_image.setAttribute('crossOrigin', 'anonymous');
            base_image.onload = function () {
                let tempCanvas = document.createElement('canvas');
                let tempContext = tempCanvas.getContext('2d');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;

                tempContext.drawImage(base_image, 0, 0); // draw the car image to the temp canvas
                tempContext.drawImage(canvas, 0, 0);// draw the main canvas to the temp canvas

                let link = document.createElement("a");
                link.download = "orbiz_numberplates.png";
                link.href = tempCanvas.toDataURL();
                document.body.appendChild(link);
                link.click();

                // context.globalCompositeOperation = 'destination-over';
                // context.drawImage(base_image, 0, 0);
            };
        }
    }

    render() {
        const { design } = this.props;
        const car_image = (this.state.car_view === 'front') ? this.state.curr_car.front_image : this.state.curr_car.rear_image;
        const numplate_image = (this.state.car_view === 'front') ? this.state.curr_design.front_image : this.state.curr_design.rear_image;

        const toolsbar_actions = {
            saveImage: this.saveImage,
            onScaleChange: this.onScaleChange,
            onPositionChange: this.onPositionChange,
            toggleCanvasView: this.toggleCanvasView
        };

        const toolsbar_props = {
            show_canvas: this.state.show_canvas,
            scale: this.state.numplate_scale,
            is_mobile: this.props.is_mobile
        };

        return (
            <Row type="flex" justify="center" className="is-relative ImageEditor">
                <Col span={24} className="tb-pad-5 actionsContainer flex-row flex-center flex-wrap">
                    <div className="pad-5 flex-row flex-center selector">
                        <span className="r-mrgn-10 property">View:</span>
                        <RadioGroup onChange={(e) => { this.handleCarView(e.target.value);}} defaultValue="front" size="small">
                            <RadioButton value="front">Front</RadioButton>
                            <RadioButton value="rear">Rear</RadioButton>
                        </RadioGroup>
                    </div>
                    <div className="pad-5 flex-row flex-center selector">
                        <span className="r-mrgn-10 property">Car Color:</span>
                        <Select defaultValue={this.props.vehicle.vehicle_models[0].name} style={{ width: "auto" }} onChange={(e)=>{this.handleCarColor(e);}}>
                            {this.props.vehicle.vehicle_models.map((model, index)=>{
                                return(
                                    <Option key={model.id} value={model.id}>{model.name}</Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="pad-5 flex-row flex-center selector">
                        <span className="r-mrgn-10 property">Design:</span>
                        <Select defaultValue={design.product_types[0].name} style={{ width: "auto" }} onChange={(e)=>{this.handleDesign(e);}}>
                            {design.product_types.map((design, index)=>{
                                return(
                                    <Option key={index} value={index.toString()}>{design.name}</Option>
                                );
                            })}
                        </Select>
                    </div>
                </Col>
                <Col span={24} className="is-no-mrgn flex-row flex-center is-relative imageContainer">
                    <div className="is-relative canvasContainer">
                        <img src={car_image} ref={(ref) => { this.car_img = ref; }} />
                        <div className="editorContainer">
                            <If condition={this.state.show_canvas && !this.state.canvas_loading && this.state.canv_height > 0}>
                                <AvatarEditor
                                    ref={(ref) => { this.editor = ref; }}
                                    image={numplate_image}
                                    width={this.state.canv_width}
                                    height={this.state.canv_height}
                                    border={0}
                                    position={this.state.curr_position}
                                    onPositionChange={this.onImageDragged}
                                    color={[255, 255, 255, 0]} // RGBA
                                    scale={this.state.numplate_scale}
                                    rotate={0}
                                />
                            </If>
                        </div>
                    </div>
                    <ToolsBar actions={toolsbar_actions} {...toolsbar_props}/>
                </Col>
            </Row>
        );
    }
}

ImageEditor.propTypes = {
    vehicle: PropTypes.object.isRequired,
    design: PropTypes.object.isRequired,
    is_mobile: PropTypes.bool
};

