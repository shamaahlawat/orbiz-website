import React, { Component } from 'react';
import { slide as Sidebar } from 'react-burger-menu';
import PropTypes from 'prop-types';

import './index.scss';

export default class SideNavbar extends Component {
    render() {
        return (
            <div className="sideNavbarContainer">
                <Sidebar  customBurgerIcon={
                    <span><i className="material-icons">menu</i></span>
                }>
                    <div className="is-relative sideBarContent">
						<ul className="menulist">
							<li className="menuItem">Products</li>
						</ul>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

SideNavbar.propTypes = {
    page_details: PropTypes.object,
    show_badge: PropTypes.bool,
};
