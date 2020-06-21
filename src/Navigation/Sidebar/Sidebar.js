import React, { useContext } from 'react';
import './Sidebar.scss';
import {NavLink} from 'react-router-dom';
import { faHome, faMapMarkerAlt , faChartLine, 
  faQuestionCircle,faMoon, faSun, faInfoCircle, faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import {ThemeContext} from '../../context/theme';
const Sidebar = React.memo(props =>{
    const {propsSidebarOpen} = props;
    const {nightMode , toggleTheme } = useContext(ThemeContext);
    const {thememode} = useContext(ThemeContext);
    return (
        <>
            <nav className={`sidebar ${thememode} ${propsSidebarOpen ? "open": ""}`}>
                <ul className="side-nav" onClick={props.closeSideBar}>
                    <li className={`side-nav__mobile-items`}>
                        <div className={`side-nav__mobile-text`}>
                            <span className="side-nav__mobile-heading">Covid-19 Tracker</span>
                        </div>
                    </li>
                    <li className={`side-nav__items`}>
                        <NavLink to='/' exact className={`side-nav__link ${propsSidebarOpen ? "open":""}`} activeClassName={`side-nav__link--active ${thememode}`}>
                            <FontAwesomeIcon icon={faHome}  color="#ff8c96" className="side-nav__icon"/>
                            <div className={`side-nav__text ${propsSidebarOpen ? "open":""}`}>
                                <span>Home</span>
                            </div>
                        </NavLink>
                        
                    </li>
                    <li className="side-nav__items">
                        <NavLink to='/map' exact className={`side-nav__link ${propsSidebarOpen ? "open":""}`} activeClassName={`side-nav__link--active ${thememode}`}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} color="#6883e6" className="side-nav__icon"/>
                            <div className={`side-nav__text ${propsSidebarOpen ? "open":""}`}>
                                <span>Map</span>
                            </div>
                        </NavLink>
                    </li>
                    <li className="side-nav__items">
                        <NavLink isActive={ (match,location)=>{
                            return location.pathname.match('/state')
                        } }  to={`/state/${'allstates'}`} className={`side-nav__link ${propsSidebarOpen ? "open":""}`} activeClassName={`side-nav__link--active ${thememode}`}>
                            <FontAwesomeIcon icon={faChartLine}  color="#a23d83" className="side-nav__icon"/>
                            <div className={`side-nav__text ${propsSidebarOpen ? "open":""}`}>
                                <span>Analysis</span>
                            </div>
                        </NavLink> 
                    </li>

                    <li className="side-nav__items">
                        <NavLink to='/faq' className={`side-nav__link ${propsSidebarOpen ? "open":""}`} activeClassName={`side-nav__link--active ${thememode}`}>
                            <FontAwesomeIcon icon={faQuestionCircle}  color="#28c1c1" className="side-nav__icon"/>
                            <div className={`side-nav__text ${propsSidebarOpen ? "open":""}`}>
                                <span>FAQ</span>
                            </div>
                        </NavLink> 
                    </li>

                    <li className="side-nav__items">
                      <NavLink to='/prevention' className={`side-nav__link ${propsSidebarOpen ? "open":""}`} activeClassName={`side-nav__link--active ${thememode}`}>
                          <FontAwesomeIcon icon={faShieldVirus}  color="#ff0c0c" className="side-nav__icon"/>
                          <div className={`side-nav__text ${propsSidebarOpen ? "open":""}`}>
                            <span>Prevention</span>
                          </div>
                      </NavLink> 
                    </li>

                    <li className="side-nav__items">
                      <NavLink to='/info' className={`side-nav__link ${propsSidebarOpen ? "open":""}`} activeClassName={`side-nav__link--active ${thememode}`}>
                          <FontAwesomeIcon icon={faInfoCircle}  color="#be4bdb" className="side-nav__icon"/>
                          <div className={`side-nav__text ${propsSidebarOpen ? "open":""}`}>
                            <span>Info</span>
                          </div>
                      </NavLink> 
                    </li>
                    
                    {/* <li className="side-nav__items">
                        <NavLink to='/faq' exact className="side-nav__link"
                        activeClassName="side-nav__link--active">
                            <FontAwesomeIcon icon={faChartLine} color="#f5a616"className="side-nav__icon"/>
                            <div className="side-nav__text">
                                <span>Analysis</span>
                            </div>
                        </NavLink>
                    </li> */}
                    <li onClick={toggleTheme} className="side-nav__items">
                        <div className="side-nav__link">
                        {!nightMode &&
                        <FontAwesomeIcon icon={faMoon} size="lg"  color="#8e8e8e"/>
                        }
                        { nightMode && 
                        <FontAwesomeIcon icon={faSun} size="lg"  color="#f5a616"/>
                        }
                        </div>
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