import React, { useState , Suspense, lazy, useEffect } from 'react';
import './HeadingComponent.scss';
import {NavLink} from 'react-router-dom';
import LoadingSearch from '../../UIComponent/LoadingSearch/LoadingSearch';
const SearchComponent = lazy(()=> import('../../UIComponent/SearchComponent/SearchComponent'));
const HeaderComponent = props=>{
    const [loadSearch, setLoadSearch ] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setLoadSearch(true);
        },2300);
    },[]);
    return (
        <> 
            <header className="header">
                
                <div className="logo">
                    <div onClick={props.clickSideDrawer} className="toggle-button-div">
                        <button className="toggle-button" >
                            <div className="toggle-button__line"></div>
                            <div className="toggle-button__line"></div>
                            <div className="toggle-button__line"></div>
                        </button>
                    </div>
                    <NavLink to='/' exact className="header__logo">
                        <span>COVID-19 Tracker</span>
                    </NavLink>
                </div>
                {loadSearch &&
                <Suspense fallback={ <LoadingSearch/>}>
                    <SearchComponent/>
                </Suspense>
                }
                {!loadSearch &&                 
                    <LoadingSearch/>
                }
                
                {/* <nav className="user-nav">
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
                    </div>
                </nav> */}
            </header>
        </>
    )
};

export default HeaderComponent;