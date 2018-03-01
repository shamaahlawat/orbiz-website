import React, { Component } from 'react';
import { Row, Col, Dropdown, Icon, Badge } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
import SideNavbar from '../sidenavbar';
import DropdownMenu from './dropdownmenu';

export default class AppNavbar extends Component {

    loadProductPage = (tag) => {
        if(tag.toString() === "0"){
            this.props.actions.navigateTo(`/product/list`);
        } else {
            this.props.actions.navigateTo(`/product/list?tags=${tag}`);
        }
    }

    render() {
        let { page_details, vehicle_types, cart_details, actions } = this.props;

        if (page_details.device_data.screen_width < 768) {
            return (
                <Row className="mobile appNavbarContainer">
                    <Col xs={{ span: 24 }}>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 22, offset: 1 }} className="flex-row flex-jsb">
                                <Col className="flex-row flex-jsa flex-ac">
                                    <div className="sidenavbar">
                                        <SideNavbar page_details={page_details} cart_details={cart_details} vehicle_types={vehicle_types} actions={actions}/>
                                    </div>
                                    <div onClick={() => { actions.navigateTo('/'); }} className="navItem">
                                        <img src="https://i0.wp.com/orbiz.in/wp-content/uploads/2017/11/a.png" alt="orbiz" className="is-cursor-ptr setBrandIcon" />
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            );
        }
        else {
            const dropdown_menu = DropdownMenu(vehicle_types, this.loadProductPage);
            return (
                <Row className="appNavbarContainer">
                    <Col xs={{ span: 24 }}>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 22, offset: 1 }} className="flex-row flex-jsb">
                                <Col className="flex-row flex-jsa flex-ac">
                                    <div className="navItem" onClick={() => { actions.navigateTo('/'); }}>
                                        <img src="https://i0.wp.com/orbiz.in/wp-content/uploads/2017/11/a.png" alt="orbiz" className="is-cursor-ptr setBrandIcon" />
                                    </div>
                                    <div className="navItem">
                                        <Dropdown overlay={dropdown_menu} placement="bottomCenter" trigger={['click']} style={{ display: 'flex' }}>
                                            <span className="ant-dropdown-link">Shop for <Icon style={{ fontSize: 10, verticalAlign: 'middle', paddingLeft: 5 }} type="caret-down" /></span>
                                        </Dropdown>
                                    </div>

                                    <div className={classNames("navItem", { 'active': page_details.current_page === CONSTANTS.appPages.PRODUCT_LIST})} onClick={() => { actions.navigateTo('/product/list'); }}>Products</div>
                                    {/* <div className="navItem">
                                        <a href="#">
                                            <div className="icon">
                                                <Icon type="search" />
                                            </div>
                                        </a>
                                    </div> */}
                                </Col>
                                <Col className="flex-row flex-jfe flex-ac">
                                    <div className={classNames("flex-row flex-center navItem", { 'active': page_details.current_page === CONSTANTS.appPages.CART })} onClick={() => { actions.navigateTo('/cart'); }}>
                                        <span>Cart&nbsp;</span>
                                        <i className="material-icons iconColor">shopping_cart</i>
                                        <Badge count={cart_details.cart_items.length}/>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        }
    }
}

AppNavbar.propTypes = {
    page_details: PropTypes.object,
    cart_details: PropTypes.object,
    vehicle_types: PropTypes.array,
    actions: PropTypes.object
};
