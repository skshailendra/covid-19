import React from 'react';
import './MainContent.scss';
import BarChartComponent from '../GraphComponent/BarChartComponent/BarChartComponent';
import LineChartComponent from '../GraphComponent/LineChartComponent/LineChartComponent';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
const MainContent = props =>{
    
    return (
        <>
            <Overview/>
            <DisplayTotal/>
            <div className="description">
                <BarChartComponent/>
                <LineChartComponent/>
            </div>
        </>
    );
};

export default MainContent;