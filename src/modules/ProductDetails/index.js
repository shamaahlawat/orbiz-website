import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
// import PropTypes from 'prop-types';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';

function mapStateToProps(state) {
	return {
		page_details: state.page_details,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, pageActions, ), dispatch)
	};
}

class ProductDetails extends Component {
	componentWillMount() {
		this.props.actions.pageChanged(CONSTANTS.appPages.PRODUCT_DETAILS);
		console.log(this.props.match.params)
	}

	render() {
		return (
            <div className="PageDetailsContainer with-t-mrgn page-container">
				<Row type="flex">
					asdass
				</Row>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ProductDetails);
