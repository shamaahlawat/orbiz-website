import React, { Component } from 'react';
import { Row, Tabs } from 'antd';
import PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;

import './index.scss';
// import If from '../../../../components/_if_component';

export default class ProdAddtnlDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullsizeView: false,
            current_tab: 1
        };
    }

    callback = (key) => {
        this.setState({
            current_tab: key
        });
    }

    render() {
        const { item } = this.props;

        return (
            <Row className="lr-pad-15 ProdAddtnlDetails">
                <Tabs animated defaultActiveKey="1" onChange={this.callback} tabBarStyle={{ backgroundColor: '#111', color: '#dad8da'}}>
                    <TabPane tab="Description" key="1">
                        <div className="flex-column tabContent">
                            <div className="font-20 is-font-medium tb-mrgn-10 title">{`ORBIZ VEHICLE NUMBER PLATES`}</div>
                            <ul className="featureList">
                                {item.features && item.features.map((feature, index) => {
                                    return (
                                        <li key={index} className="font-12 feature">{feature}</li>
                                    );
                                })}
                            </ul>
                            <span className="t-mrgn-10 font-12 word-wrap subtitle">{item.features.subtitle}</span>
                        </div>
                    </TabPane>
                    <TabPane tab="Additional information" key="2">
                        <div className="lr-pad-30 flex-column tabContent">
                            <div className="font-20 is-font-medium tb-mrgn-10 title">Designs</div>
                            <span className="flex-row flex-wrap">
                                {item.additional_info && item.additional_info.map((tag, index) => {
                                    return (
                                        <a key={index} className="font-12 mrgn-5 tag">{tag}</a>
                                    );
                                })}
                            </span>
                        </div>
                    </TabPane>
                    <TabPane tab={`Reviews (${(item.reviews && item.reviews.length) || 0})`} key="3">
                        <div className="flex-column tabContent" style={{ paddingLeft: 60}}>
                            <div className="font-20 is-font-medium tb-mrgn-10 title">Reviews will be added later</div>
                        </div>
                    </TabPane>
                </Tabs>
            </Row>
        );
    }
}

ProdAddtnlDetails.propTypes = {
    item: PropTypes.object.isRequired
};

