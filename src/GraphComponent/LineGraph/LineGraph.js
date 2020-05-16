
import React, { useEffect, useState, useReducer, useContext} from 'react';
import './LineGraph.scss';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,LineChart, Line,Legend
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';
import useDeviceAgent from '../../hooks/device-agent';

const LineGraph = props =>{
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
      setChartWidth(520);setChartHeight(400);
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
      setChartWidth(300);setChartHeight(400);
    }
    console.log(device);
    console.log("chartwidth",chartWidth);
  },[device]);
    return (
        <>
            <div className="line-chart-container">
                <div className="line-chart">
                      <LineChart width={chartWidth} height={chartHeight} data={latestData}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <Line type="monotone" dataKey="dailyconfirmed" stroke="#8884d8"/>
                      <Line type="monotone" dataKey="dailyrecovered" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="dailydeceased" stroke="#82ca9d" />
                      </LineChart>        
                </div>
            </div>
        </>
    );
}
export default LineGraph;