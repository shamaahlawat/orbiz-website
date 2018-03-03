import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as itemActions from '../../data/redux/item_details/actions';

import FullPageLoader from '../../components/fullpageloader';
import HomeCarousal from './components/homecarousal';
import ItemListContainer from '../../components/itemlist';
import VehicleSelector from './components/vehicleselector';
import Awards from './components/awards';

const option = {
    dots: false,
    autoplay: true,
    effect: 'fade',
    autoplaySpeed: 3000
};

const option1 = {
    ...option,
    dots: true,
    autoplay: false,
    effect: 'scrollx',
    adaptiveHeight: true,
    centerMode: true
};

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        item_details: state.item_details,
        vehicle_details: state.vehicle_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, itemActions), dispatch)
    };
}

class Home extends Component {

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.HOME);
        this.props.actions.getHomePageData();
    }

    loadPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        const { page_details, item_details, vehicle_details } = this.props;
        if (page_details.loaders.page_loading) {
            return (
                <FullPageLoader />
            );
        } else {
            const itemActions = {
                toggleItemFavorite: this.props.actions.toggleItemFavorite,
                loadPath: this.loadPath
            };

            const plateListProps = {
                title: page_details.home_page_data.PRODUCT_SECTION_1.title,
                items: page_details.home_page_data.PRODUCT_SECTION_1.products,
                current_filter_type: 'all',
                filters: vehicle_details.vehicle_types,
                show_filter: true,
                show_sort: false,
                loading: item_details.loaders.page_loading
            };

            const frameListProps = {
                ...plateListProps,
                title: page_details.home_page_data.PRODUCT_SECTION_2.title,
                items: page_details.home_page_data.PRODUCT_SECTION_2.products,
                loading: item_details.loaders.page_loading
            };

            return (
                <div className="HomeContainer page-container">
                    <Row className="flex-column">
                        {/* primary carousal section*/}
                        <Col xs={{ span: 24 }} className="SectionContainer MainCarousalContainer">
                            <HomeCarousal type="image" items={page_details.home_page_data.IMAGES.images} options={option} />
                        </Col>

                        {/* number plates list  section*/}
                        <Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer NumberPlatesContainer">
                            <ItemListContainer {...plateListProps} actions={itemActions} />
                        </Col>

                        {/* custom carousal section */}
                        <Col xs={{ span: 24 }} className="t-pad-20 b-pad-50 black-bg SectionContainer CarousalContainer">
                            <Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
                                <div className="lr-pad-15 is-text-center font-24 titleText">We Also Make Custom Number Plates For Your Premium Car</div>
                            </Col>
                            <HomeCarousal type="mixed" items={page_details.home_page_data.FEATURED_SECTION.featured_products} options={option1} actions={itemActions} />
                        </Col>

                        {/* frames list  section*/}
                        <Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer FramesContainer">
                            <ItemListContainer {...frameListProps} actions={itemActions} />
                        </Col>

                        {/* choose vehicle list  section*/}
                        <Col xs={{ span: 24 }} className="tb-pad-20 black-bg SectionContainer vehicleSelectorContainer">
                            <Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
                                <div className="lr-pad-15 is-text-center font-24 titleText">Want to see how number plate will look on your vehicle?</div>
                            </Col>
                            <Col xs={{ span: 22, offset: 1 }}>
                                <VehicleSelector />
                            </Col>
                        </Col>

                        {/* awards  section*/}
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
}

Home.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    page_details: PropTypes.object,
    item_details: PropTypes.object,
    vehicle_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Home);
