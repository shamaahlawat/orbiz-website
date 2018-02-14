import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { push } from 'react-router-redux';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as itemActions from '../../data/redux/item_details/actions';

import If from '../../components/_if_component';
import HomeCarousal from './components/homecarousal';
import ItemListContainer from './components/itemlist';
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

const vehicleData = [
    {
        _id: 0,
        type: "Car",
        models: [
            {
                _id: 0,
                name: "Maruti 800"
            },
            {
                _id: 1,
                name: "I20"
            }
        ]
    },
    {
        _id: 1,
        type: "Bike",
        models: [
            {
                _id: 0,
                name: "Royal Enfield"
            },
            {
                _id: 1,
                name: "Pulsar 200 NS"
            },
            {
                _id: 2,
                name: "Triumph"
            }
        ]
    },
    {
        _id: 2,
        type: "Super Car",
        models: [
            {
                _id: 0,
                name: "Lamborghini"
            },
            {
                _id: 1,
                name: "Porsche Cayenne"
            }
        ]
    },
    {
        _id: 3,
        type: "Bus",
        models: [
            {
                _id: 0,
                name: "Tata"
            },
            {
                _id: 1,
                name: "Ashok Leyland"
            }
        ]
    }
];

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

class Home extends Component {

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.HOME);
        this.props.actions.getHomeCarousals();
        this.props.actions.getNumberPlates();
        this.props.actions.getFrames();
    }

    loadItemDetails = (path) => {
        this.props.push(path);
    }

    render() {
        const { page_details, item_details } = this.props;
        const itemActions = {
            toggleItemFavorite: this.props.actions.toggleItemFavorite,
            loadItemDetails: this.loadItemDetails,
        }

        return (
            <div className="HomeContainer page-container">
                <Row className="flex-column">
                    {/* primary carousal section*/}
                    <Col xs={{ span: 24 }} className="SectionContainer MainCarousalContainer">
                        <HomeCarousal type="image" items={page_details.primary_carousal} options={option} loading={page_details.loaders.carousal_loading} />
                    </Col>

                    {/* number plates list  section*/}
                    <Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer NumberPlatesContainer">
                        <ItemListContainer title="Number Plates" items={item_details.numplates_list} current_filter_type={'all'} loading={item_details.loaders.numplates_loading} actions={itemActions}/>
                    </Col>

                    {/* custom carousal section */}
                    <Col xs={{ span: 24 }} className="t-pad-20 b-pad-50 black-bg SectionContainer CarousalContainer">
                        <Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
                            <div className="lr-pad-15 is-text-center font-24 titleText">We Also Make Custom Number Plates For Your Premium Car</div>
                        </Col>
                        <HomeCarousal type="mixed" items={page_details.secondary_carousal} options={option1} loading={page_details.loaders.carousal_loading} />
                    </Col>

                    {/* frames list  section*/}
                    <Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer FramesContainer">
                        <ItemListContainer title="Frames" items={item_details.frames_list} current_filter_type={'all'} loading={item_details.loaders.frames_loading} actions={itemActions}/>
                    </Col>

                    {/* choose vehicle list  section*/}
                    <Col xs={{ span: 24 }} className="tb-pad-20 black-bg SectionContainer vehicleSelectorContainer">
                        <Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
                            <div className="lr-pad-15 is-text-center font-24 titleText">Want to see how number plate will look on your vehicle?</div>
                        </Col>
                        <Col xs={{ span: 22, offset: 1 }}>
                            <VehicleSelector vehicles={vehicleData} />
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

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Home);
