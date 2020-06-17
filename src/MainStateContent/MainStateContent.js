import React,{useContext}from 'react';
import './MainStateContent.scss';
import Overview from '../Overview/Overview';
import StateWiseDisplayTotal from '../StateWiseDisplayTotal/StateWiseDisplayTotal';
import AllDistrictState from '../AllDistrictState/AllDistrictState';
import {ThemeContext} from '../context/theme';
const MainStateContent = props =>{
    const {thememode} = useContext(ThemeContext);
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