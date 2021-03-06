import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'antd';
import classNames from 'classnames';

import './index.scss';
import Item from '../item';
import ItemLoader from '../item/loader';

export default class ItemListContainer extends Component {
    loadPath = (path) => {
        this.props.actions.loadPath(path);
    };

    render() {
        const { actions, items, title, loading, filters, show_filter } = this.props;
        let search_term;
        if(title && title.toLowerCase() === 'number plates'){
            search_term = 'category=number';
        } else if(title && title.toLowerCase() === 'frames'){
            search_term = 'category=frames';
        }
        return (
            <Row className="full-flex ItemsListContainer">
                <Col xs={{ span: 24 }} className="flex-row flex-jsb flex-ac titleContainer">
                    <div className="font-24 titleText">{title}</div>

                        {/* <If condition={show_sort}>
                            <span className="filterItem is-capitalize r-pad-10">Sort By:</span>
                            <Select defaultValue="0" size="small" style={{ width: "auto"}} placeholder="Select sort">
                                <Option value="0">Price: Lowest to Highest</Option>
                                <Option value="1">Price: Highest to Lowest</Option>
                            </Select>
                        </If> */}
                    {show_filter &&
                        <div className="flex-row flex-jsa filterContainer desktop">
                            <span className="filterItem is-capitalize pad-10">For:</span>
                            <span className={classNames("is-capitalize pad-10 is-cursor-ptr filterItem", { 'active': this.props.current_filter_type === 'all' })}>All</span>
                            {filters.map(filter => {
                                return (
                                    <span key={filter.id} className={classNames("is-capitalize pad-10 is-cursor-ptr filterItem", { 'active': this.props.current_filter_type === filter.name })} onClick={()=> { this.loadPath(`/product/list?tags=${filter.name}`);}}>{filter.name}</span>
                                );
                            })}
                        </div>
                    }

                    {show_filter &&
                        <div className="flex-row flex-jsa filterContainer mobile">
                            <span className="filterItem is-capitalize pad-10 active" onClick={() => { this.loadPath(`/product/list?${search_term}`); }}>View All</span>
                        </div>
                    }
                </Col>

                {loading &&
                    <Col xs={{ span: 24 }} className="flex-row flex-wrap flex-ac ItemsList">
                        {[1, 2, 3, 4].map((item) => {
                            return (
                                <Col xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 6 }} key={item} className="flex-row full-flex flex-ac pad-15 ItemContainer">
                                    <ItemLoader />
                                </Col>
                            );
                        })}
                    </Col>
                }

                {!loading &&
                    <Col xs={{ span: 24 }} className="flex-row flex-wrap flex-ac ItemsList">
                        {items.length > 0 && items.map((item) => {
                            return (
                                <div key={item.id} className="flex-row full-flex flex-ac pad-15 ItemContainer">
                                    <Item item={item} actions={actions} />
                                </div>
                            );
                        })}
                        {items.length == 0 &&
                            <span className="flex-row flex-center full-flex emptyList">Sorry! No products to display. Please refine your search!</span>
                        }
                    </Col>
                }

                {this.props.type !== 'list_page' &&
                    <Col xs={{ span: 24 }} className="pad-15 flex-row flex-center buttonContainer">
                        <Button className="animated zoomIn flex-row btn-fill-black" onClick={() => { this.loadPath(`/product/list?${search_term}`); }}>
                            <span className="flex-row flex-center full-flex">SHOW ALL</span>
                        </Button>
                    </Col>
                }
            </Row>
        );
    }
}

ItemListContainer.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool,
    show_filter: PropTypes.bool,
    show_sort: PropTypes.bool,
    filters: PropTypes.array,
    current_filter_type: PropTypes.string,
    actions: PropTypes.object,
};

