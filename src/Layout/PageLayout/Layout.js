import React from 'react';
import Sidebar from '../../Navigation/Sidebar/Sidebar';
import RoutingComponent from '../../RoutingComponent/RoutingComponent';
import HeaderComponent from '../../Navigation/HeaderComponent/HeaderComponent';
import './Layout.scss';
import FooterComponent from '../../Navigation/FooterComponent/FooterComponent';

const Layout = props =>{
    return (
        <>
            <div className="headingLayout">
                <div>
                    <HeaderComponent/>
                </div>
            </div>
            <div className="layout">
                <div className="sidebarLayout">
                    <Sidebar/>
                </div>
                <div className="mainContentLayout">
                <RoutingComponent/>
                </div>
            </div>
            <div className="footer-layout">
                <FooterComponent/>
            </div>
        </>
    )
};

export default Layout;