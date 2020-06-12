import React , {Suspense , lazy , useEffect ,useState,useContext}from 'react';
import './MainContent.scss';
import BarChartComponent from '../GraphComponent/BarChartComponent/BarChartComponent';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
import SyncAreaComponent from '../GraphComponent/SyncAreaComponent/SyncAreaComponent';
import {ThemeContext} from '../context/theme';
const TableComponent = lazy(()=>import('../UIComponent/TableComponent/TableComponent'));
const MainContent = props =>{
    const [showTable,setShowTable] = useState(false);
    const {thememode} = useContext(ThemeContext);
    useEffect(()=>{
       const handleScrollEvent = () =>{
        if ((window.innerHeight + window.pageYOffset + 200) >= document.body.offsetHeight) {
           setShowTable(true);
         }
       };
       // setShowTable(true);
       window.addEventListener('scroll', handleScrollEvent);
       return(()=> window.removeEventListener('scroll',handleScrollEvent));
    },[]);
    return (
        <>
            <Overview/>
            <DisplayTotal/>
            <div className={`description ${thememode}`}>
                <BarChartComponent/>
                <SyncAreaComponent/>
                { showTable && 
                <Suspense fallback={<div>Loading...</div>}>
                    <TableComponent/>
                </Suspense>
                }
            </div>
        </>
    );
};

export default MainContent;