
import React, { useEffect, useState, useReducer, useContext} from 'react';
import './SynchronizedAreaChart.scss';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';
import useDeviceAgent from '../../hooks/device-agent';

const SynchronizedAreaChart = props =>{
  const [latestData,setLatestData] = useState([]);
  const fetchCovidData = useContext(FetchDataContext);
  const casesTimeSeries = fetchCovidData.casesTimeSeries;
  const {device} = useDeviceAgent();
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const [filterData,setFilterData] = useState('');

  //let chartHeight = 250;
  let filterArray = [];
  useEffect(()=>{
    console.log("redraw");
    if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
      filterArray = casesTimeSeries.filter( (data)=>data.date.includes("May"));
      setLatestData(filterArray);
    }
    return ()=>{
      console.log("Cleanup runss");
    }
  },[casesTimeSeries,chartWidth]); 
  useEffect(()=>{
      console.log("filterData", filterData);
      
  },[filterData]); 
  useEffect(()=>{
    if(device && device.isExtraLargeDevice){
      setChartWidth(530);setChartHeight(400);
    }
    if(device && device.isLargeDevice){
      setChartWidth(600);setChartHeight(400);
    }
    if(device && device.isMediumLargeDevice){
      setChartWidth(600);setChartHeight(300);
    }
    if(device && device.isMediumDevice){
      setChartWidth(600);setChartHeight(400);
    }
    if(device && device.isSmallDevice){
      setChartWidth(300);setChartHeight(300);
    }
    console.log(device);
    console.log("chartwidth",chartWidth);
  },[device]);
    return (
        <>
            <div className="sync-area-chart-container">
                <div className="sync-area-chart">
                              <AreaChart width={400} height={200} data={props.latestData} syncId="anyId"
                            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='dailyconfirmed' stroke='#8884d8' fill='#8884d8' />
                      </AreaChart>
                      <AreaChart width={400} height={200} data={props.latestData} syncId="anyId"
                            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='dailyrecovered' stroke='#82ca9d' fill='#82ca9d' />
                      </AreaChart>
                      <AreaChart width={400} height={200} data={props.latestData} syncId="anyId"
                            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='dailydeceased' stroke='grey' fill='grey' />
                      </AreaChart>     
                </div>
            </div>
        </>
    );
}
export default SynchronizedAreaChart;