import React, { Component } from 'react';
import { slide as Sidebar } from 'react-burger-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge } from 'antd';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';

export default class SideNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    loadProductPage = (tag) => {
        if (tag.toString() === "0") {
            this.props.actions.navigateTo(`/product/list`);
        } else {
            this.props.actions.navigateTo(`/product/list?tags=${tag}`);
        }
        this.setState({
            isOpen: false
        });
    }

    render() {
        const { page_details, vehicle_types, cart_details, actions } = this.props;
        return (
            <div className="sideNavbarContainer">
                <Sidebar isOpen={this.state.isOpen} customBurgerIcon={
                    <span><i className="material-icons">menu</i></span>
                }>
                    <div className="is-relative sideBarContent">
                        <ul className="menulist">
                            <li className="menuItem">
                                <span>Shop for</span>
                                <ul className="menulist subMenuList">
                                    <li className="menuItem subMenuItem" onClick={() => this.loadProductPage(0)}>All</li>
                                    {
                                        vehicle_types.map((type) => {
                                            return (
                                                <li className="menuItem subMenuItem" key={type.id} onClick={() => this.loadProductPage(type.name)}>{type.name}</li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                            <li className={classNames("menuItem", { 'active': page_details.current_page === CONSTANTS.appPages.PRODUCT_LIST })} onClick={() => { actions.navigateTo('/product/list'); }}>Products</li>
                            <li className={classNames("flex-row flex-ac menuItem", { 'active': page_details.current_page === CONSTANTS.appPages.CART })} onClick={() => { actions.navigateTo('/cart'); }}>
                                <span className="r-mrgn-10">Cart</span><Badge count={cart_details.cart_items.length} />
                            </li>
						</ul>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

SideNavbar.propTypes = {
    page_details: PropTypes.object,
    cart_details: PropTypes.object,
    vehicle_types: PropTypes.array,
    actions: PropTypes.object
};
