import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
// import PropTypes from 'prop-types';

import './index.scss';

import * as pageActions from '../../data/redux/page_details/actions';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, ), dispatch)
    };
}

class ProductList extends Component {
    render() {
        return (
            <div className="TryitContainer page-container">
                <Row type="flex">
                    <Col xs={{ span: 24 }} className="SectionContainer MainCarousalContainer">
                        <ItemCarousal type="image" items={CarousalItems} options={option} />
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer NumberPlatesContainer">
                        <ItemListContainer title="Number Plates" items={NumberPlatesItems} current_filter_type={'all'} />
                    </Col>
                    <Col xs={{ span: 24 }} className="t-pad-20 b-pad-50 black-bg SectionContainer CarousalContainer">
                        <Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
                            <div className="lr-pad-15 is-text-center font-24 titleText">We Also Make Custom Number Plates For Your Premium Car</div>
                        </Col>
                        <ItemCarousal type="mixed" items={frameCarousalItems} options={option1} />
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer FramesContainer">
                        <ItemListContainer title="Frames" items={frameItems} current_filter_type={'all'} />
                    </Col>
                    <Col xs={{ span: 24 }} className="tb-pad-20 black-bg SectionContainer vehicleSelectorContainer">
                        <Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
                            <div className="lr-pad-15 is-text-center font-24 titleText">Want to see how number plate will look on your vehicle?</div>
                        </Col>
                        <Col xs={{ span: 22, offset: 1 }}>
                            <VehicleSelector vehicles={vehicleData} />
                        </Col>
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer awardsSectionContainer">
                        <Col xs={{ span: 24 }} className="b-mrgn-20 flex-column flex-center primary titleContainer">
                            <div className="font-24 titleText">ORBIZ AUTOMOTIVEZ</div>
                            <div className="underline">&nbsp;</div>
                        </Col>
                        <Col xs={{ span: 24 }} className="b-mrgn-20 flex-column flex-center">
                            <Awards />
                        </Col>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductList);
