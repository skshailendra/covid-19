import React ,{useState, useEffect}from 'react';
import Sidebar from '../../Navigation/Sidebar/Sidebar';
import RoutingComponent from '../../RoutingComponent/RoutingComponent';
import HeaderComponent from '../../Navigation/HeaderComponent/HeaderComponent';
import './Layout.scss';
import FooterComponent from '../../Navigation/FooterComponent/FooterComponent';
import Backdrop from '../../UIComponent/Backdrop/Backdrop';

const Layout = props =>{
    const [sideDrawerOpen,setSideDrawerOpen] = useState(false);
    const [mainContentLayout,setMainContentLayout] = useState("main-content-layout");
    const toggleClickHandler = ()=>{
        const temp = !sideDrawerOpen;
        setSideDrawerOpen(!sideDrawerOpen);
    }

    useEffect(()=>{
        let copyMain = "main-content-layout";
        if(sideDrawerOpen){
            copyMain = "main-content-layout main-content-side-open"; 
        }
       setMainContentLayout(copyMain);
    },[sideDrawerOpen]);
  
    
    return (
        <>
            <HeaderComponent clickSideDrawer={toggleClickHandler}/>
            <Sidebar sidebarOpen={sideDrawerOpen}/>
            {/* <Backdrop/> */}
            <div className="layout">
                {/* <div className="side-drawer-layout">
                    
                </div> */}
                <div className={mainContentLayout}>
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