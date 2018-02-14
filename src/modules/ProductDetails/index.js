import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as itemActions from '../../data/redux/item_details/actions';
import ProdDetails from './components/proddetails';
import ProdDetailsLoader from './components/proddetails/loader';
import ProdImage from './components/prodimage';
import ProdImageLoader from './components/prodimage/loader';
import ProdAddtnlDetails from './components/prodadditionaldetails';


function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        item_details: state.item_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        push: (path) => dispatch(push(path)),
        actions: bindActionCreators(Object.assign({}, pageActions, itemActions), dispatch)
    };
}

class ProductDetails extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.PRODUCT_DETAILS);
        this.props.actions.getItemDetails(this.props.match.params);
    }

    render() {
        const { item_details } = this.props;

        if (item_details.loaders.item_loading) {
            return (
                <div className="ProductDetailsContainer tb-pad-30 page-container">
                    <Row className="lr-pad-15">
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="ProdImageContainer">
                            <ProdImageLoader />
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="r-pad-15 ProdDetailsContainer">
                            <ProdDetailsLoader />
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div className="ProductDetailsContainer tb-pad-30 page-container">
                    <Row className="lr-pad-15">
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="ProdImageContainer">
                            {item_details.current_item && <ProdImage item={item_details.current_item} />}
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="r-pad-15 ProdDetailsContainer">
                            {item_details.current_item && <ProdDetails item={item_details.current_item} />}
                        </Col>
                        <Col xs={{ span: 24 }} className="t-mrgn-40 ProdAddtnlDetailsContainer">
                            {item_details.current_item && <ProdAddtnlDetails item={item_details.current_item} />}
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

ProductDetails.propTypes = {
    actions: PropTypes.object,
    match: PropTypes.object,
    page_details: PropTypes.object,
    item_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductDetails);
