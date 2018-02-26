import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Collapse, Select } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

import * as pageActions from '../../data/redux/page_details/actions';

import ItemListContainer from '../../components/itemlist';

const Panel = Collapse.Panel;
const Option = Select.Option;

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        item_details: state.item_details,
        vehicle_details: state.vehicle_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, ), dispatch)
    };
}

class ProductList extends Component {
    loadPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        const curr_type = this.props.match.params.tag;
        const { item_details, vehicle_details } = this.props;
        const listActions = {
            loadPath: this.loadPath
        };

        const itemProps = {
            title: curr_type,
            items: item_details.numplates_list,
            show_filter: false,
            show_sort: true,
            filters: vehicle_details.vehicle_types,
            loading: item_details.loaders.numplates_loading,
        };

        return (
            <Row className="ProductList">
                <Col xs={{ span: 22, offset: 1 }} className="b-pad-30">
                    <Row gutter={24}>
                        <Col xs={24} sm={8} md={5}>
                            <p className="tb-mrgn-20"> Showing all 5 results</p>
                            <Collapse bordered={false} className="collapseContainer">
                                <Panel header="Products" key="1">
                                    <p>&nbsp;</p>
                                </Panel>
                                <Panel header="Ideal For" key="2">
                                    <p>&nbsp;</p>
                                </Panel>
                                <Panel header="Design" key="3" >
                                    <p>&nbsp;</p>
                                </Panel>
                                <Panel header="Shapes" key="4" >
                                    <p>&nbsp;</p>
                                </Panel>
                                <Panel header="Prize Range" key="5" >
                                    <p>&nbsp;</p>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col xs={24} sm={16} md={19} className="pad-15">
                            <ItemListContainer {...itemProps} actions={listActions} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

ProductList.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    page_details: PropTypes.object,
    item_details: PropTypes.object,
    vehicle_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductList);
