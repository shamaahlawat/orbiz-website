import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button, Select } from 'antd';
import classNames from 'classnames';

import './index.scss';
import If from '../_if_component';
import Item from '../item';
import ItemLoader from '../item/loader';

export default class ItemListContainer extends Component {
    loadPath = (path) => {
        this.props.actions.loadPath(path);
    };

    render() {
        const { actions, items, title, loading, filters, show_filter, show_sort } = this.props;

        return (
            <Row className="full-flex ItemsListContainer">
                <Col xs={{ span: 24 }} className="flex-row flex-jsb flex-ac titleContainer">
                    <div className="font-24 titleText">{title}</div>
                    <div className="flex-row flex-jsa filterContainer desktop">
                        <If condition={show_sort}>
                            <span className="filterItem is-capitalize r-pad-10">Sort By:</span>
                            <Select defaultValue="0" size="small" style={{ width: "auto"}} placeholder="Select sort">
                                <Option value="0">Price: Lowest to Highest</Option>
                                <Option value="1">Price: Highest to Lowest</Option>
                            </Select>
                        </If>
                        <If condition={show_filter}>
                            <span className="filterItem is-capitalize pad-10">For:</span>
                            <span className={classNames("is-capitalize pad-10 is-cursor-ptr filterItem", { 'active': this.props.current_filter_type === 'all' })}>All</span>
                            {filters.map(filter => {
                                return (
                                    <span key={filter.id} className={classNames("is-capitalize pad-10 is-cursor-ptr filterItem", { 'active': this.props.current_filter_type === filter.name })}>{filter.name}</span>
                                );
                            })}
                        </If>
                    </div>
                    <div className="flex-row flex-jsa filterContainer mobile">
                        <span className="filterItem is-capitalize pad-10 active" onClick={() => { this.loadPath('/product/list'); }}>View All</span>
                    </div>
                </Col>

                <If condition={loading}>
                    <Col xs={{ span: 24 }} className="flex-row flex-wrap flex-ac ItemsList">
                        {[1, 2, 3, 4].map((item) => {
                            return (
                                <Col xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 6 }} key={item} className="flex-row full-flex flex-ac pad-15 ItemContainer">
                                    <ItemLoader />
                                </Col>
                            );
                        })}
                    </Col>
                </If>

                <If condition={!loading}>
                    <Col xs={{ span: 24 }} className="flex-row flex-wrap flex-ac ItemsList">
                        {items.length > 0 && items.map((item) => {
                            return (
                                <div key={item.id} className="flex-row full-flex flex-ac flex-jsa pad-15 ItemContainer">
                                    <Item item={item} actions={actions} />
                                </div>
                            );
                        })}
                     </Col>
                </If>

                <Col xs={{ span: 24 }} className="pad-15 flex-row flex-center buttonContainer">
                    <Button className="animated zoomIn flex-row btn-fill-black" onClick={() => { this.loadPath('/product/list'); }}>
                        <span className="flex-row flex-center full-flex">SHOW ALL</span>
                    </Button>
                </Col>
            </Row>
        );
    }
}

ItemListContainer.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool,
    show_filter: PropTypes.bool,
    show_sort: PropTypes.bool,
    filters: PropTypes.array,
    current_filter_type: PropTypes.string,
    actions: PropTypes.object,
};

