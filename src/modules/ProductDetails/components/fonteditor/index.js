import React, { Component } from 'react';
import { Row, Col, Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';

import './index.scss';

export default class FontEditor extends Component {
    state = {
        curr_position: undefined,
        canvas_loading: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                canvas_loading: true
            }, () => {
                this.setFontParams();
            });
        }, 300);
    }

    componentWillReceiveProps(){
        this.setFontParams();
    }

    setFontParams = () => {
        let plate_height_in_pixel = this.editor.clientHeight / 12; //plate size ~ 50cm x 12cm 19.6" x 4.7"
        this.setState({
            canvas_loading: false,
            font_size: this.editor.clientHeight - (plate_height_in_pixel * 7),
            right: plate_height_in_pixel * 3,
        });
    }

    render() {
        return (
            <Row type="flex" justify="center" className="is-relative FontEditor">
                <Col span={24} className="pad-15 is-no-mrgn flex-row flex-center is-relative">
                    <img className="full-flex img-contain" ref={(ref) => { this.editor = ref; }} src={this.props.design} style={{ width: '100%' }}/>
                    {!this.state.canvas_loading &&
                        <span className="is-absolute regNum" style={{ fontFamily: this.props.font, fontSize: this.state.font_size, right: this.state.right }}>{this.props.reg_number}</span>
                    }
                </Col>

                <Col span={24} className="tb-pad-5 actionsContainer flex-row flex-center flex-wrap">
                    <div className="pad-5 flex-row flex-center selector">
                        <span className="font-xs">Disclaimer: This is a representation of how your registration number will look on the numberplate. Actual product look may vary as letters are punched in the plate. Refer product images for actual images </span>
                    </div>
                </Col>
            </Row>
        );
    }
}

FontEditor.propTypes = {
    design: PropTypes.string.isRequired,
    font: PropTypes.string,
    reg_number: PropTypes.string,
    page_details: PropTypes.object
};

