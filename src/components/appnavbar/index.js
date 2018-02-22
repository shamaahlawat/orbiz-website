import React, { Component } from 'react';
import { Row, Col, Menu, Dropdown, Icon } from 'antd';
import PropTypes from 'prop-types';

import SideNavbar from '../sidenavbar';
import './index.scss';

const dropdown_menu = (
    <div className="navbarDropdownMenuContainer">
        <Menu>
            <Menu.Item key="0">
                <a href="#" className="font-14 is-font-medium">
                    <span>All</span>
                </a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="#" className="font-14 is-font-medium">
                    <span>Bike</span>
                </a>
            </Menu.Item>
            <Menu.Item key="2">
                <a href="#" className="font-14 is-font-medium">
                    <span>Car</span>
                </a>
            </Menu.Item>
            <Menu.Item key="3">
                <a href="#" className="font-14 is-font-medium">
                    <span>Super Car</span>
                </a>
            </Menu.Item>
            <Menu.Item key="4">
                <a href="#" className="font-14 is-font-medium">
                    <span>Bus</span>
                </a>
            </Menu.Item>
        </Menu>
    </div>
);

export default class AppNavbar extends Component {

    render() {
        let { page_details, actions } = this.props;

        if (page_details.device_data.screen_width < 768) {
            return (
                <Row className="mobile appNavbarContainer">
                    <Col xs={{ span: 24 }}>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 22, offset: 1 }} className="flex-row flex-jsb">
                                <Col className="flex-row flex-jsa flex-ac">
                                    <div className="navItem">
                                        <SideNavbar page_details={page_details} />
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
                                            <a className="ant-dropdown-link" href="#">Shop for <Icon style={{ fontSize: 10, verticalAlign: 'middle', paddingLeft: 5 }} type="caret-down" /></a>
                                        </Dropdown>
                                    </div>

                                    <div className="navItem">
                                        <a href="#">
                                            <div className="icon">Products</div>
                                        </a>
                                    </div>
                                    <div className="navItem">
                                        <a href="#">
                                            <div className="icon">
                                                <Icon type="search" />
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                                <Col className="flex-row flex-jfe flex-ac">
                                    <div className="flex-row flex-center navItem" onClick={() => { actions.navigateTo('/cart'); }}>
                                        <span>Cart&nbsp;</span>
                                        <i className="material-icons iconColor">shopping_cart</i>
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
    actions: PropTypes.object
};
