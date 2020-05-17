import React from 'react';
import './MainContent.scss';
import BarChartComponent from '../GraphComponent/BarChartComponent/BarChartComponent';
import LineChartComponent from '../GraphComponent/LineChartComponent/LineChartComponent';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
import SyncAreaComponent from '../GraphComponent/SyncAreaComponent/SyncAreaComponent';
const MainContent = props =>{
    
    return (
        <>
            <Overview/>
            <DisplayTotal/>
            <div className="description">
                <BarChartComponent/>
                {/* <LineChartComponent/> */}
                <SyncAreaComponent/>
            </div>
        </>
    );
};

export default MainContent;