import React from 'react';
import './MainStateContent.scss';
import BarChartComponentState from '../GraphComponent/BarChartComponentState/BarChartComponentState';
import Overview from '../Overview/Overview';
import StateWiseDisplayTotal from '../StateWiseDisplayTotal/StateWiseDisplayTotal';
import AllDistrictState from '../AllDistrictState/AllDistrictState';
const MainStateContent = props =>{
    
    return (
        <>
            <Overview/>
            <StateWiseDisplayTotal/>
            <div className="description">
                <AllDistrictState/>
            </div>
        </>
    );
};

export default MainStateContent;