import React,{useContext,useEffect}from 'react';
import './MainStateContent.scss';
import Overview from '../Overview/Overview';
import StateWiseDisplayTotal from '../StateWiseDisplayTotal/StateWiseDisplayTotal';
import AllDistrictState from '../AllDistrictState/AllDistrictState';
import {ThemeContext} from '../context/theme';
import ReactGa from 'react-ga';
import {Helmet, HelmetProvider} from 'react-helmet-async';
const MainStateContent = props =>{
    const {thememode} = useContext(ThemeContext);
    useEffect(()=>{
        ReactGa.initialize('UA-169939716-1');
        ReactGa.pageview(window.location.pathname + window.location.search);
    });
    return (
        <>
            <HelmetProvider>
            <Helmet>
                <title>COVID-19 Tracker: India -All States Analysis</title>
                <meta
                name="title"
                content="COVID-19 Tracker across India -All States Analysis"
                />
                <meta
                name="description"
                content="COVID-19 Tracker across India -All States Analysis.
                Track All confirmed , recovered , active ,deceased/deaths cases in India. States wise and district wise cases "
                />
                <link rel="canonical" href="https://trackcovid19india.web.app/state/allstates" />
            </Helmet>
            </HelmetProvider>
            <Overview/>
            <StateWiseDisplayTotal/>
            <div className={`description ${thememode}`}>
                <AllDistrictState/>
            </div>
        </>
    );
};

export default MainStateContent;