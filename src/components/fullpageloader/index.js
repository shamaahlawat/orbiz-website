import React, { Component } from 'react';

export default class FullPageLoader extends Component {
    render() {
        return (
            <div xs={{ span: 24 }} className="pad-15 flex-column flex-center full-width full-min-height">
                <img className="blinkingImg" src="https://i0.wp.com/orbiz.in/wp-content/uploads/2017/11/a.png" alt="orbiz" style={{ maxWidth: 200 }} />
            </div>
        );
    }
}

