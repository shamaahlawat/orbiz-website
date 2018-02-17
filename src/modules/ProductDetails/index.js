import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Modal, Button } from 'antd';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as itemActions from '../../data/redux/item_details/actions';
import * as vehicleActions from '../../data/redux/vehicle_details/actions';
import If from '../../components/_if_component';
import ProdDetails from './components/proddetails';
import ProdDetailsLoader from './components/proddetails/loader';
import ProdImage from './components/prodimage';
import ProdImageLoader from './components/prodimage/loader';
import ProdAddtnlDetails from './components/prodadditionaldetails';
import ImageEditorLoader from './components/imageeditor/loader';
import ImageEditor from './components/imageeditor';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        item_details: state.item_details,
        vehicle_details: state.vehicle_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        push: (path) => dispatch(push(path)),
        actions: bindActionCreators(Object.assign({}, pageActions, itemActions, vehicleActions), dispatch)
    };
}

class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            try_visible: false,
            curr_design: 0
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDesignChange = this.handleDesignChange.bind(this);
        this.openImageEditor = this.openImageEditor.bind(this);
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.PRODUCT_DETAILS);
        this.props.actions.getItemDetails(this.props.match.params);
    }

    componentWillReceiveProps(nextProps) {
        let try_path = `/${CONSTANTS.appPages.PRODUCT}/details/:product_id/try`;
        let self= this;
        let shouldOpenImageEditor = (nextProps.match.path === try_path && nextProps.item_details.current_item !== this.props.item_details.current_item) || (nextProps.match.path === try_path && nextProps.match.path !== this.props.match.path && nextProps.item_details.current_item._id);
        if (shouldOpenImageEditor) {
            setTimeout(function() {
                self.props.actions.getVehicleDetails("tesla-s");
                self.setState({
                    try_visible: true
                });
            }, 1000);
        }
    }

    openImageEditor = () => {
        let nextPage = `/${CONSTANTS.appPages.PRODUCT}/details/${this.props.match.params.product_id}/try`;
        this.props.history.push(nextPage);
    }

    handleCloseModal = () => {
        this.setState({
            try_visible: false
        }, () => {
            let prevPage = `/${CONSTANTS.appPages.PRODUCT}/details/${this.props.match.params.product_id}/`;
            this.props.history.push(prevPage);
        });

    };

    handleDesignChange = (index) => {
        this.setState({
            curr_design: index
        });
    }

    render() {
        const { item_details, vehicle_details } = this.props;
        const is_mobile = (this.props.page_details.device_data.screen_width < 768);
        const actions = {
            handleDesignChange: this.handleDesignChange,
            openImageEditor: this.openImageEditor
        };

        if (item_details.loaders.item_loading) {
            return (
                <div className="ProductDetailsContainer tb-pad-30 page-container">
                    <Row className="lr-pad-15 animated zoomIn">
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
                            {item_details.current_item && <ProdImage item_image={item_details.current_item.designs[this.state.curr_design].image} />}
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="r-pad-15 ProdDetailsContainer">
                            {item_details.current_item && <ProdDetails item={item_details.current_item} curr_design={this.state.curr_design} actions={actions} />}
                        </Col>
                        <Col xs={{ span: 24 }} className="t-mrgn-40 ProdAddtnlDetailsContainer">
                            {item_details.current_item && <ProdAddtnlDetails item={item_details.current_item} />}
                        </Col>
                    </Row>
                    <If condition={this.state.try_visible}>
                        <Modal
                            className={"modalStyle"}
                            wrapClassName="vertical-center-modal"
                            title={"Try your number plate"}
                            visible={this.state.try_visible}
                            onCancel={this.handleCloseModal}
                            footer={[
                                <Button key="back" onClick={this.handleCloseModal}>Cancel</Button>,
                            ]}>
                                <If condition={vehicle_details.loaders.vehicle_loading}>
                                    <ImageEditorLoader />
                                </If>
                                <If condition={vehicle_details.loaders.vehicle_loaded && vehicle_details.current_vehicle && !!vehicle_details.current_vehicle._id}>
                                <ImageEditor vehicle={vehicle_details.current_vehicle} design={item_details.current_item} is_mobile={is_mobile}/>
                                </If>
                        </Modal>
                    </If>
                </div>
            );
        }
    }
}

ProductDetails.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    match: PropTypes.object,
    page_details: PropTypes.object,
    item_details: PropTypes.object,
    vehicle_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductDetails);
