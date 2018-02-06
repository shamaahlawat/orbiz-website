import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'antd';

import './index.scss';
import If from '../../../../components/_if_component';

export default class Item extends Component {
	render() {
		const { actions, item } = this.props;

		return (
			<Col xs={{ span: 24 }} className="pad-15 flex-column NumberPlateContainer">
				<Col xs={{ span: 24 }} className="is-relative imageContainer">
					<img className="itemImage" src={item.imageUrl} alt={item.name}/>
					<If condition={item.hasOffer}>
						<div className="font-12 offerTag">OFFER</div>
					</If>
				</Col>
				<Col xs={{ span: 24 }} className="flex-row flex-jsb flex-ac detailsContainer">
					<div className="flex-column itemDetails">
						<div className="t-pad-10 name">{item.name}</div>
						<div className="t-pad-5 flex-row price">
							<span className={classNames("actualPrice", { 'hasOffer': item.offerPrice > 0 })}>${item.price}</span>
							<If condition={item.offerPrice > 0}>
								<div className="offerPrice">${item.offerPrice}</div>
							</If>
						</div>
					</div>
				<div className="flex-row flex-center favorites">
						<i className="is-cursor-ptr material-icons">favorite_border</i>
					</div>
				</Col>
			</Col>
		);
	}
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
	actions: PropTypes.object,
};

