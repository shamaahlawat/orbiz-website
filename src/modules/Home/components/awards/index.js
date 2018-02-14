import React, { Component } from 'react';
import { Row } from 'antd';

import './index.scss';

import img1 from '../../data/assets/img/24x7.png';
import img2 from '../../data/assets/img/award.png';

export default class Awards extends Component {
    render() {
        return (
            <Row type="flex" justify="center" className="AwardsContainer">
                <div className="is-text-center word-wrap description">
                    Mainly, we are car number plate manufacturers. We make number plates as per the requirements of the customers. At Orbiz, we use different font designs and styles for your number plates. Moreover, we supply beautiful frames for your car and bike or any other vehicles to hold the Orbiz number plate in it’s elegant beauty. As a matter of fact, we are the major supplier of number plate making machines in India. Although we are number plate manufacture, we also supply number plate embossing machines. We also supply all the raw materials such as blank plates, foils, stickers, clapper dies, etc
				</div>
                <div className="tb-pad-30 flex-row flex-jsa flex-ac awardIconList">
                    <div className="r-pad-50 flex-column flex-center">
                        <img className="awardIcon" src={img1} alt="" />
                        <span className="tb-pad-10 awardTitle">24*7 Support</span>
                    </div>
                    <div className="flex-column flex-center">
                        <img className="awardIcon" src={img2} alt="" />
                        <span className="tb-pad-10 awardTitle">1 Year Warranty</span>
                    </div>
                </div>
            </Row>
        );
    }
}

