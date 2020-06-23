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
                <Helmet >
                    <title>COVID-19 Tracker India</title>
                    <script type="application/ld+json">{`
                        {
                            "@context": "https://schema.org/",
                            "@type": "SpecialAnnouncement",
                            "name": "COVID-19 Tracker India",
                            "url": "https://trackcovid19india.web.app/",
                            "text":"COVID-19 Tracker India, Track Cases across states and districts of India",
                            "datePosted": "2020-06-15",
                            "alternateName": "COVID-19 Tracker India",
                            "description":"COVID-19 Tracker India",
                            "category": "https://www.wikidata.org/wiki/Q81068910"
                        }
                    `}</script>
                    <meta
                    name="title"
                    content="COVID-19 Tracker India, Track Cases across states and districts of India"
                    />
                    <meta
                    name="description"
                    content="COVID-19 Tracker India"
                    />
                    <link rel="canonical" href="https://trackcovid19india.web.app/"/>
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