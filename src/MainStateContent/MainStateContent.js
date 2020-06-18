import React,{useContext,useEffect}from 'react';
import './MainStateContent.scss';
import Overview from '../Overview/Overview';
import StateWiseDisplayTotal from '../StateWiseDisplayTotal/StateWiseDisplayTotal';
import AllDistrictState from '../AllDistrictState/AllDistrictState';
import {ThemeContext} from '../context/theme';
import ReactGa from 'react-ga';
const MainStateContent = props =>{
    const {thememode} = useContext(ThemeContext);
    useEffect(()=>{
        ReactGa.initialize('UA-169939716-1');
        ReactGa.pageview(window.location.pathname + window.location.search);
    });
    return (
        <>
            <Overview/>
            <StateWiseDisplayTotal/>
            <div className={`description ${thememode}`}>
                <AllDistrictState/>
            </div>
        </>
    );
};

export default MainStateContent;