import React, { useState } from 'react';
import './Sidebar.scss';
import {NavLink} from 'react-router-dom';
import { faHome, faMapMarkerAlt , faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

const Sidebar = React.memo(props =>{

    return (
        <>
            <nav className="sidebar">
                <ul className="side-nav">
                    <li className="side-nav__items">
                        <NavLink to='/' exact className="side-nav__link" activeClassName="side-nav__link--active">
                            <FontAwesomeIcon icon={faHome}  color="#ff8c96" className="side-nav__icon"/>
                            <div className="side-nav__text">
                                <span>Home</span>
                            </div>
                        </NavLink>
                        
                    </li>
                    <li className="side-nav__items">
                        <NavLink to='/analysis' exact className="side-nav__link" activeClassName="side-nav__link--active">
                            <FontAwesomeIcon icon={faChartLine}  color="#f5a616" className="side-nav__icon"/>
                            <div className="side-nav__text">
                                <span>Analysis</span>
                            </div>
                        </NavLink>
                        
                    </li>
                    <li className="side-nav__items">
                        <NavLink to='/announcement' exact className="side-nav__link" activeClassName="side-nav__link--active">
                            <FontAwesomeIcon icon={faMapMarkerAlt} color="#6883e6" className="side-nav__icon"/>
                            <div className="side-nav__text">
                                <span>Map</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="side-nav__items">
                        <NavLink to='/faq' exact className="side-nav__link"
                        activeClassName="side-nav__link--active">
                            <FontAwesomeIcon icon={faChartLine} color="#f5a616"className="side-nav__icon"/>
                            <div className="side-nav__text">
                                <span>Analysis</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
                {/* <div className="sidebar-theme">
                    <span>Made with </span>
                    <FontAwesomeIcon icon={faHeart} 
                    size="sm" 
                    className="sidebar__icon" />
                    <span>
                        Open Source Project</span>                       
                </div> */}
            </nav>
        </>
    )
});

export default Sidebar;