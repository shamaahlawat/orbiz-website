import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Collapse, Select } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

import * as pageActions from '../../data/redux/page_details/actions';

import ItemListContainer from '../../components/itemlist'

const Panel = Collapse.Panel;
const Option = Select.Option;

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
            <Row className="ProductList">
                <Col xs={{ span: 22, offset: 1 }} className="b-pad-30">
                    <Row gutter={24}>
                        <Col xs={24} sm={8} md={5}>
                            <p className="tb-mrgn-20"> Showing all 5 results</p>
                            <Collapse bordered={false} className="collapseContainer">
                                <Panel header="Products" key="1">
                                    <p></p>
                                </Panel>
                                <Panel header="Ideal For" key="2">
                                    <p></p>
                                </Panel>
                                <Panel header="Design" key="3" >
                                    <p></p>
                                </Panel>
                                <Panel header="Shapes" key="4" >
                                    <p></p>
                                </Panel>
                                <Panel header="Prize Range" key="5" >
                                    <p></p>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col xs={24} sm={16} md={19} className="lr-pad-15">
                            <Row>
                                <Col xs={24} className="flex-row flex-jfe tb-pad-20">
                                    <div className="r-pad-10"><p>Sort by : </p></div>
                                    <Select size="small" style={{ width: 120 }}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    {/* <ItemListContainer /> */}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

ProductList.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductList);
