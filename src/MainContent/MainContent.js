import React, {useRef, useEffect, useState} from 'react';
import Card from '../Layout/Card/Card';
import './MainContent.scss';
import {Line } from 'react-chartjs-2';
import caseTimeSeries from '../data/caseTimeSeries';

import { faHome, faStar, faSync,faStoreAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import BarGraph from '../GraphComponent/BarGraph/BarGraph';
import BarChartComponent from '../GraphComponent/BarChartComponent/BarChartComponent';
import LineChartComponent from '../GraphComponent/LineChartComponent/LineChartComponent';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
import DropdownComponent from '../UIComponent/DropdownComponent/DropdownComponent';
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