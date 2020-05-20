import React from 'react';
import './MainContent.scss';
import BarChartComponent from '../GraphComponent/BarChartComponent/BarChartComponent';
import LineChartComponent from '../GraphComponent/LineChartComponent/LineChartComponent';
import PieGraph from '../GraphComponent/PieGraph/PieGraph';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
import SyncAreaComponent from '../GraphComponent/SyncAreaComponent/SyncAreaComponent';
import TableComponent from '../UIComponent/TableComponent/TableComponent';
const MainContent = props =>{
    
    return (
        <>
            <Overview/>
            <DisplayTotal/>
            <div className="description">
                <BarChartComponent/>
                {/* <LineChartComponent/> */}
                {/* <PieGraph/> */}
                <SyncAreaComponent/>
                <TableComponent/>
            </div>
        </>
    );
};

export default MainContent;