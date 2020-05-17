
import React, { useEffect, useState} from 'react';
import './TinyGraph.scss';
import {
  XAxis, YAxis, LineChart, Line
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';
import useDeviceAgent from '../../hooks/device-agent';

const TinyGraph = props =>{
    const {device} = useDeviceAgent();
    const [chartWidth, setChartWidth] = useState(800);
    const [chartHeight, setChartHeight] = useState(400);
    const {filterCaseType} = props;
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
            <div className="tiny-chart-container">
                <div className="tiny-chart">
                <LineChart width={200} height={100}  data={props.latestData}>
                  <Line type='monotone' dataKey='dailyconfirmed' stroke='#8884d8' strokeWidth={2} />
                </LineChart>
                </div>
            </div>
        </>
    );
}
export default TinyGraph;