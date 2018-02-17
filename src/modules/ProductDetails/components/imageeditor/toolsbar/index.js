import React, { Component } from 'react';
import { Slider } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import '../index.scss';

export default class ToolsBar extends Component {
    render() {
        const { actions } = this.props;
        const slider_props = {
            min: 0.01,
            step: 0.01,
            max: 1.2,
            defaultValue: 0.3,
            value: this.props.scale,
            onChange: actions.onScaleChange
        };
        const portrait = window.matchMedia("(orientation: portrait)").matches;

        if (!this.props.is_mobile || !portrait) {
            slider_props.vertical = true;
            slider_props.style = { height: 200 };
        } else {
            slider_props.style = { width: 200 };
        }

        return (
            <div className={classNames('flex-center toolsBar tb-pad-5', {'flex-row': this.props.is_mobile && portrait, 'flex-cr': !this.props.is_mobile || !portrait})}>
                <div className={classNames('pad-5 flex-column flex-center tool')}>
                    <Slider {...slider_props} />
                </div>
                <div className={classNames('pad-5 flex-column flex-center tool', { 'active': this.props.show_canvas })} onClick={() => { actions.toggleCanvasView(); }}>
                    <i className="material-icons">{this.props.show_canvas ? 'visibility' : 'visibility_off'}</i>
                </div>
                {/* <div className={"pad-5 flex-column flex-center tool"} onClick={() => { actions.saveImage(); }}>
                    <i className="material-icons">save</i>
                </div> */}
            </div>
        );
    }
}

ToolsBar.propTypes = {
    scale: PropTypes.number,
    show_canvas: PropTypes.bool,
    show_tools: PropTypes.bool,
    show_state: PropTypes.string,
    is_mobile: PropTypes.bool,
    actions: PropTypes.object,
};
