import React, { useContext } from 'react';
import './HeadingComponent.scss';
import {NavLink} from 'react-router-dom';
//import LoadingSearch from '../../UIComponent/LoadingSearch/LoadingSearch';
import {ThemeContext} from '../../context/theme';
import SearchComponent from '../../UIComponent/SearchComponent/SearchComponent';

const HeaderComponent = props=>{
    //const [loadSearch, setLoadSearch ] = useState(false);
    const {thememode} = useContext(ThemeContext);
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setLoadSearch(true);
    //     });
    // },[]);
    return (
        <> 
            <header className={`header ${thememode}`}>
                
                <div className="logo">
                    <div onClick={props.clickSideDrawer} className="toggle-button-div">
                        <button className="toggle-button" >
                            <div className={`toggle-button__line ${thememode}`}></div>
                            <div className={`toggle-button__line ${thememode}`}></div>
                            <div className={`toggle-button__line ${thememode}`}></div>
                        </button>
                    </div>
                    <NavLink to='/' exact className={`header__logo ${thememode}`}>
                        <span>COVID-19 Tracker</span>
                    </NavLink>
                </div>
                <SearchComponent/>
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