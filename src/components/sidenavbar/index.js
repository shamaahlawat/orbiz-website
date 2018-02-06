import React, { Component } from 'react';
import { slide as Sidebar } from 'react-burger-menu';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { icons as iconsUrl } from '../../data/assets/url_assets';

import './index.scss';

export default class SideNavbar extends Component {
    render() {
        return (
            <div className="sideNavbarContainer">
                <Sidebar  customBurgerIcon={
                    <span><i className="material-icons">menu</i></span>
                }>
                    <div className="is-relative sideBarContent">
                        <div className="bg-white t-pad-10">
                            {/* <ProfileCard show_badge={true} /> */}
                        </div>
                        <div className="pad-15 headerList">
                            <div className="flex-row tb-pad-10 ">
                                <div className="font-20 flex-column flex-jc iconBox">
                                    <Icon type="solution" />
                                </div>
                                <div className="font-16 flex-column flex-jc full-width l-mrgn-15 title">
                                    <span>Feed</span>
                                </div>
                                <div className="flex-column flex-jc iconBox">
                                    <i className="material-icons font-20">keyboard_arrow_right</i>
                                </div>
                            </div>
                            <div className="flex-row tb-pad-10 activeHeaderItem">
                                <div className="font-20 flex-column flex-jc iconBox">
                                    <Icon type="compass" />
                                </div>
                                <div className="font-16 full-width l-mrgn-15 flex-column flex-jc title">
                                    <span>Explore</span>
                                </div>
                                <div className="flex-column flex-jc iconBox">
                                    <i className="material-icons font-20">keyboard_arrow_right</i>
                                </div>
                            </div>
                        </div>
                        <div className="pad-15 full-width is-absolute sidebarFooter">
                            <p className="is-text-center font-12 lr-pad-10">For the best poletalks experience download our free app !!!</p>
                            <div className="t-pad-20 flex-row flex-jc flex-wrap">
                                <div className="r-mrgn-20  footerIconBox">
                                    <img src={iconsUrl.googlePlayCard} alt="" className="img-contain" />
                                </div>
                                <div className="footerIconBox">
                                    <img src={iconsUrl.appStoreCard} alt="" className="img-contain imgAdjust" />
                                </div>
                            </div>
                        </div>
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
