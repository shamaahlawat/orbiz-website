import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Collapse } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as itemActions from '../../data/redux/item_details/actions';

import ItemListContainer from '../../components/itemlist';

const Panel = Collapse.Panel;

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

class ProductList extends Component {
    constructor(props) {
        super(props);
        let search_term;
        if (this.props.location.search) {
            search_term = {
                tags: this.props.location.search.split('?tags=')[1],
                category: this.props.location.search.split('?category=')[1]
            };
        }
        this.state = {
            search_term
        };
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.PRODUCT_LIST);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location !== nextProps.location){
           let search_term;
            search_term = {
                tags: nextProps.location.search.split('?tags=')[1],
                category: nextProps.location.search.split('?category=')[1]
            };
            this.props.actions.getProducts(search_term);
            this.setState({
                search_term
            });
        }
    }

    loadPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        let curr_type;
        if(this.state.search_term && this.state.search_term.category && this.state.search_term.category !== 'number'){
            curr_type = this.state.search_term.category;
        } else if(this.state.search_term && this.state.search_term.tags){
            curr_type = this.state.search_term.tags;
        } else {
            curr_type = "Number Plates";
        }
        const { item_details, vehicle_details } = this.props;
        const listActions = {
            loadPath: this.loadPath,
            toggleItemFavorite: this.props.actions.toggleItemFavorite,
        };

        const itemProps = {
            // title: curr_type,
            type: "list_page",
            items: item_details.numplates_list,
            show_filter: false,
            show_sort: true,
            filters: vehicle_details.vehicle_types,
            loading: item_details.loaders.numplates_loading,
        };

        return (
            <Row className="ProductList">
                <Col xs={24} className="tb-pad-30 titleContainer">
                    <Col xs={{ span: 22, offset: 1 }} className="font-24">{curr_type}</Col>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} className="b-pad-30">
                    <Row gutter={24}>
                        <Col xs={24} sm={8} md={5}>
                            <p className="tb-mrgn-20"> Showing all {item_details.numplates_list.length} results</p>
                            <Collapse bordered={false} className="collapseContainer">
                                <Panel header="Products" key="1">
                                    <ul className="filterList">
                                        <li
                                            className={classNames("filterItem", { 'active': this.state.search_term && this.state.search_term.category === 'number'})}
                                            onClick={()=>{ this.loadPath('/product/list?category=number'); }}
                                        >Number Plates</li>
                                        <li
                                            className={classNames("filterItem", { 'active': this.state.search_term && this.state.search_term.category === 'frames'})}
                                            onClick={()=>{ this.loadPath('/product/list?category=frames'); }}
                                        >Frames</li>
                                    </ul>
                                </Panel>
                                <Panel header="Ideal For" key="2">
                                    <ul className="filterList">
                                        {vehicle_details.vehicle_types.map((type) => {
                                            return (
                                                <li
                                                    className={classNames("filterItem", { 'active': this.state.search_term && this.state.search_term.tags === type.name})}
                                                    key={type.id}
                                                    onClick={()=>{ this.loadPath(`/product/list?tags=${type.name}`); }}
                                                >{type.name}</li>
                                            );
                                        })}
                                    </ul>
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
    location: PropTypes.object,
    actions: PropTypes.object,
    page_details: PropTypes.object,
    item_details: PropTypes.object,
    vehicle_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductList);
