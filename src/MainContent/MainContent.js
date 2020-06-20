import React , {Suspense , lazy , useEffect ,useState,useContext}from 'react';
import './MainContent.scss';
import BarChartComponent from '../GraphComponent/BarChartComponent/BarChartComponent';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
import SyncAreaComponent from '../GraphComponent/SyncAreaComponent/SyncAreaComponent';
import {ThemeContext} from '../context/theme';
import ReactGa from 'react-ga';
import {Helmet, HelmetProvider} from 'react-helmet-async';
const TableComponent = lazy(()=>import('../UIComponent/TableComponent/TableComponent'));

const MainContent = props =>{
    const [showTable,setShowTable] = useState(false);
    const {thememode} = useContext(ThemeContext);
  
    useEffect(()=>{
        setTimeout(()=>{
            setShowTable(true);
        },20);
    },[]);
    useEffect(()=>{
        ReactGa.initialize('UA-169939716-1');
        ReactGa.pageview(window.location.pathname + window.location.search);
    });
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta
                    name="title"
                    content="COVID-19 Tracker India"
                    />
                    <meta
                    name="description"
                    content="COVID-19 Tracker India"
                    />
                </Helmet>
            </HelmetProvider>
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