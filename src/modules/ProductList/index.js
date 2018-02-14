import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

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
                    <Col span={24} className="text-center">product list will be loaded here</Col>
                </Row>
            </div>
        );
    }
}

ProductList.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductList);
