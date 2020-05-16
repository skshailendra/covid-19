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
                <div className="sidebar-layout">
                    <Sidebar/>
                </div>
                <div className="main-content-layout">
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