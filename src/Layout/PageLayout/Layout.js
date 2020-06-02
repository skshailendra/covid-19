import React ,{useState}from 'react';
import Sidebar from '../../Navigation/Sidebar/Sidebar';
import RoutingComponent from '../../RoutingComponent/RoutingComponent';
import HeaderComponent from '../../Navigation/HeaderComponent/HeaderComponent';
import './Layout.scss';
import FooterComponent from '../../Navigation/FooterComponent/FooterComponent';
import Backdrop from '../../UIComponent/Backdrop/Backdrop';

const Layout = props =>{
    const [sideDrawerOpen,setSideDrawerOpen] = useState(false); 
    const toggleClickHandler = ()=>{
        setSideDrawerOpen(!sideDrawerOpen);
    };
    const backdropHandler = ()=>{
        setSideDrawerOpen(false);
    };  
    console.log("layout called");
    return (
        <>
            <HeaderComponent clickSideDrawer={toggleClickHandler}/>
            <Sidebar propsSidebarOpen={sideDrawerOpen} closeSideBar={backdropHandler}/>
            {sideDrawerOpen && 
                <Backdrop clickBackdrop={backdropHandler} />
            }
            <div className="layout">
                {/* <div className="side-drawer-layout">
                    
                </div> */}
                <div className={`main-content-layout ${sideDrawerOpen ? "main-content-side-open":""}`}>
                <RoutingComponent/>
                </div>
            </div>
            {/* <div className="footer-layout">
                <FooterComponent/>
            </div> */}
        </>
    )
};

export default Layout;