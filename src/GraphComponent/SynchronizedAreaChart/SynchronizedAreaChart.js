
import React, { useEffect, useState, useReducer, useContext} from 'react';
import './SynchronizedAreaChart.scss';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';
import useDeviceAgent from '../../hooks/device-agent';
import {ThemeContext} from '../../context/theme';
const SynchronizedAreaChart = props =>{
  const [latestData,setLatestData] = useState([]);
  const fetchCovidData = useContext(FetchDataContext);
  const casesTimeSeries = fetchCovidData.casesTimeSeries;
  const {device} = useDeviceAgent();
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const [filterData,setFilterData] = useState('');
  const {thememode} = useContext(ThemeContext);
  //let chartHeight = 250;
  let filterArray = [];
  useEffect(()=>{
    if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
      filterArray = casesTimeSeries.filter( (data)=>data.date.includes("May"));
      setLatestData(filterArray);
    }
    return ()=>{

    }
  },[casesTimeSeries,chartWidth]); 
  useEffect(()=>{

      
  },[filterData]); 
  useEffect(()=>{
    if(device && device.isExtraLargeDevice){
      setChartWidth(400);setChartHeight(400);
    }
    if(device && device.isLargeDevice){
      setChartWidth(400);setChartHeight(400);
    }
    if(device && device.isMediumDevice){
      setChartWidth(700);setChartHeight(400);
    }
    if(device && device.isSmallDevice){
      setChartWidth(300);setChartHeight(300);
    }
  },[device]);
    return (
        <>
            <div className="sync-area-chart-container">
                <div className={`sync-area-chart ${thememode}`}>
                  <AreaChart width={chartWidth} height={chartHeight} data={props.latestData} syncId="anyId"
                        margin={{top: 10, right: 20, left: 10, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Area type='monotone' dataKey='dailyconfirmed' stroke='#8884d8' fill='#ed3833' />
                  </AreaChart>
                  <AreaChart width={chartWidth} height={chartHeight} data={props.latestData} syncId="anyId"
                        margin={{top: 50, right: 20, left: 10, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Area type='monotone' dataKey='dailyrecovered' stroke='#82ca9d' fill='#82ca9d' />
                  </AreaChart>
                  <AreaChart width={chartWidth} height={chartHeight} data={props.latestData} syncId="anyId"
                        margin={{top: 50, right: 20, left: 10, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Area type='monotone' dataKey='dailydeceased' stroke='grey' fill='grey' />
                  </AreaChart>     
                </div>
            </div>
        </>
    );
}
export default SynchronizedAreaChart;