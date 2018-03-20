import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Modal, Button } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as itemActions from '../../data/redux/item_details/actions';
import * as vehicleActions from '../../data/redux/vehicle_details/actions';
import * as cartActions from '../../data/redux/cart_details/actions';
import ProdDetails from './components/proddetails';
import ProdDetailsLoader from './components/proddetails/loader';
import ProdImage from './components/prodimage';
import ProdImageLoader from './components/prodimage/loader';
import ProdAddtnlDetails from './components/prodadditionaldetails';
import ImageEditorLoader from './components/imageeditor/loader';
import ImageEditor from './components/imageeditor';
import FontEditor from './components/fonteditor';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        item_details: state.item_details,
        vehicle_details: state.vehicle_details,
        cart_details: state.cart_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, itemActions, vehicleActions, cartActions), dispatch)
    };
}

class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            show_editor: false,
            curr_design: undefined,
            curr_variant: undefined
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDesignChange = this.handleDesignChange.bind(this);
        this.openImageEditor = this.openImageEditor.bind(this);
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.PRODUCT_DETAILS);
        this.props.actions.getItemDetails(this.props.match.params.product_id);
    }

    componentWillReceiveProps(nextProps) {
        let try_path = `/product/details/:product_id/try`;
        let self= this;
        let shouldOpenImageEditor = (nextProps.vehicle_details.current_vehicle && nextProps.match.path === try_path && !!nextProps.item_details.current_item.id);
        if (shouldOpenImageEditor) {
            setTimeout(function () {
                self.setState({
                    show_editor: true
                });
            }, 1000);
        } else if (nextProps.match.path === try_path && !shouldOpenImageEditor ) {
            this.props.history.push(`/product/details/${this.props.match.params.product_id}`);
        }

        if (nextProps.item_details.loaders.item_loading !== this.props.item_details.loaders.item_loading && !nextProps.item_details.loaders.item_loading && this.props.item_details.current_item && this.props.item_details.current_item.product_types.length > 0) {
            this.setState ({
                curr_design: this.props.item_details.current_item.product_types[0]
            });
        }
    }

    openImageEditor = (type) => {
        if (type === 'font') {
            this.setState({
                show_editor: true,
                editor_mode: 'font'
            });
        } else {
            this.setState({
                editor_mode: null
            });
            setTimeout(() => {
                if (this.props.vehicle_details.current_vehicle) {
                    let nextPage = `/${CONSTANTS.appPages.PRODUCT}/details/${this.props.match.params.product_id}/try`;
                    this.props.history.push(nextPage);
                }
            }, 100);
        }
    }

    handleCloseModal = () => {
        this.setState({
            show_editor: false
        }, () => {
            let prevPage = `/${CONSTANTS.appPages.PRODUCT}/details/${this.props.match.params.product_id}/`;
            this.props.history.push(prevPage);
        });

    };

    handleDesignChange = (curr_design) => {
        this.setState({
            curr_design
        });
    }

    handleVariantChange = (curr_variant) => {
        this.setState({
            curr_variant
        });
    }

    loadPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        const { page_details, item_details, vehicle_details, cart_details } = this.props;

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
            const is_mobile = (this.props.page_details.device_data.screen_width < 768);
            const actions = {
                handleDesignChange: this.handleDesignChange,
                handleVariantChange: this.handleVariantChange,
                getVehicleDetails: this.props.actions.getVehicleDetails,
                openImageEditor: this.openImageEditor,
                loadPath: this.loadPath,
                addToCart: this.props.actions.addToCart,
                removeFromCart: this.props.actions.removeFromCart
            };

            return (
                <div className="ProductDetailsContainer tb-pad-30 page-container">
                    <Row className="lr-pad-15">
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="ProdImageContainer">
                            { item_details.current_item &&
                                <ProdImage item_image={this.state.curr_design && this.state.curr_design.image} />
                            }
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} className="r-pad-15 ProdDetailsContainer">
                            { item_details.current_item &&
                                <ProdDetails item={item_details.current_item}
                                    curr_design={this.state.curr_design}
                                    curr_variant={this.state.curr_variant}
                                    registration_number={vehicle_details.registration_number}
                                    cart_details={cart_details} actions={actions}
                                />
                            }
                        </Col>
                        <Col xs={{ span: 24 }} className="t-mrgn-40 ProdAddtnlDetailsContainer">
                            { item_details.current_item &&
                                <ProdAddtnlDetails item={item_details.current_item} />
                            }
                        </Col>
                    </Row>
                    <Modal
                        className={"modalStyle"}
                        wrapClassName="vertical-center-modal"
                        title={"Try your number plate"}
                        visible={this.state.show_editor}
                        onCancel={this.handleCloseModal}
                        footer={[
                            <Button key="back" onClick={this.handleCloseModal}>Cancel</Button>,
                        ]}>

                        {this.state.editor_mode !== 'font' &&  vehicle_details.loaders.vehicle_loading && <ImageEditorLoader />}

                        {this.state.editor_mode !== 'font' &&  vehicle_details.loaders.vehicle_loaded && vehicle_details.current_vehicle && vehicle_details.current_vehicle.name &&
                            <ImageEditor vehicle={vehicle_details.current_vehicle} design={item_details.current_item} is_mobile={is_mobile} />
                        }
                        {this.state.editor_mode === 'font' &&
                            <FontEditor page_details={page_details} font="batman" design="https://res.cloudinary.com/poletalks/image/upload/v1521560575/orbiz/WhatsApp_Image_2018-03-19_at_14.41.32_yoo0pn.jpg" reg_number={vehicle_details.registration_number}/>
                        }
                    </Modal>
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
    vehicle_details: PropTypes.object,
    cart_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductDetails);
