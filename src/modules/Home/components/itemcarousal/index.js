import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Carousel, Button } from 'antd';

import './index.scss';

export default class ItemCarousal extends Component {
	render() {
		const { options, items } = this.props;

		if (this.props.type === 'image') {
			return (
				<Row className="CarousalContainer">
					<Carousel {...options}>
						{items.map((item, index) => {
							return (
								<img className="carousalItem" src={item.imageUrl} key={index} />
							);
						})}
					</Carousel>
				</Row>
			);
		} else {
			return (
				<Row className="itemCarousal CarousalContainer">
					<Carousel {...options}>
						{items.map((item, index) => {
							return (
								<Col xs={{ span: 24 }} sm={{ span: 20 }} key={index} className="flex-row carousalItem">
									<div className="full-flex flex-column flex-jsa flex-ac  textContainer">
										<div className="is-text-center word-wrap subtitle">{item.subtitle}</div>
										<div className="is-text-center font-24 word-wrap title">
											<span>{item.title}</span>
											<Col xs={{ span: 4, offset: 10 }} className="underline">&nbsp;</Col>
										</div>
										<div className="is-text-center font-14 word-wrap description">{item.description}</div>
										<div className="button">
											<Button className="flex-row btn-fill-white">
												<a href="#" className="flex-row flex-center full-flex">SHOP NOW</a>
											</Button>
										</div>
									</div>
									<div className="mediaContainer" style={{ backgroundImage: `url(${item.imageUrl})` }} >
										&nbsp;
									</div >
								</Col>
							);
						})}
					</Carousel>
				</Row>
			);
		}

	}
}

ItemCarousal.propTypes = {
	type: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	type: PropTypes.string.isRequired,
	options: PropTypes.object
};

