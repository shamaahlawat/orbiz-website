import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'antd';
import classNames from 'classnames';

import './index.scss';
import Item from '../item';

export default class ItemListContainer extends Component {
	render() {
		const { actions, items, title } = this.props;
		const filters = ['all', 'bike', 'car', 'super car', 'bus'];

		return (
			<Row className="full-flex ItemsListContainer">
				<Col xs={{ span: 24 }} className="flex-row flex-jsb flex-ac titleContainer">
					<div className="font-24 titleText">{title}</div>
					<div className="flex-row flex-jsa filterContainer desktop">
						<span className="filterItem is-capitalize pad-10">For:</span>
						{filters.map((item, index) => {
							return (
								<span key={index} className={classNames("is-capitalize pad-10 is-cursor-ptr filterItem", { 'active': this.props.current_filter_type === item })}>{item}</span>
							);
						})}
					</div>
					<div className="flex-row flex-jsa filterContainer mobile">
						<span className="filterItem is-capitalize pad-10 active">View All</span>
					</div>
				</Col>
				<Col xs={{ span: 24 }} className="flex-row flex-wrap flex-ac ItemsList">
					{items.map((item) => {
						return (
							<Col xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 6 }} key={item._id} className="flex-row full-flex flex-ac pad-15 ItemContainer">
								<Item item={item} {...actions} />
							</Col>
						);
					})}
				</Col>
				<Col xs={{ span: 24 }} className="pad-15 flex-row flex-center buttonContainer">
					<Button className={classNames("animated zoomIn flex-row btn-fill-black")}>
						<a href="#" className="flex-row flex-center full-flex">SHOW ALL</a>
					</Button>
				</Col>
			</Row>
		);
	}
}

ItemListContainer.propTypes = {
	title: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	current_filter_type: PropTypes.string,
	actions: PropTypes.object,
};

