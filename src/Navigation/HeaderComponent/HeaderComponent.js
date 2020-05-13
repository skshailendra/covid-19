import React, { useState } from 'react';
import './HeadingComponent.scss';
import { faSearch, faBell,faInfoCircle,faShareAlt,faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import SearchComponent from '../../UIComponent/SearchComponent/SearchComponent';
const HeaderComponent = props=>{
    return (
        <> 
            <header className="header">
                <div className="logo">
                    <span>COVID-19 Tracker</span>
                </div>
                <SearchComponent/>
                <nav className="user-nav">
                    <div className="user-nav__icon-box">
                        <FontAwesomeIcon icon={faInfoCircle}  size="lg" color="fff" className="user-nav__icon"/>
                    </div>
                    <div className="user-nav__icon-box">
                        <FontAwesomeIcon icon={faBell}  size="lg"  color="fff" 
                        className="user-nav__icon"/>
                        <span className="user-nav__notification"></span>
                    </div>
                    <div className="user-nav__icon-box">
                        <FontAwesomeIcon icon={faShareAlt}  size="lg" color="fff" 
                        className="user-nav__icon"/>
                        {/* <span className="user-nav__notification"></span> */}
                    </div>
                </nav>
            </header>
        </>
    )
};

export default HeaderComponent;