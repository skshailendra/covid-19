
import React, { useEffect, useState} from 'react';
import './LineGraph.scss';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,LineChart, Line,Legend
  } from 'recharts';

import useDeviceAgent from '../../hooks/device-agent';

const LineGraph = props =>{
  const {device} = useDeviceAgent();
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  useEffect(()=>{
    if(device && device.isExtraLargeDevice){
      setChartWidth(700);setChartHeight(400);
    }
    if(device && device.isLargeDevice){
      setChartWidth(700);setChartHeight(400);
    }
    if(device && device.isMediumDevice){
      setChartWidth(700);setChartHeight(400);
    }
    if(device && device.isSmallDevice){
      setChartWidth(300);setChartHeight(350);
    }
  },[device]);
    return (
        <>
          <div className="line-chart">
            <LineChart width={chartWidth} height={chartHeight} data={props.latestData}
                 scale="auto" >
            <XAxis dataKey="date"/>
            <YAxis  domain={['auto',  dataMax => {return (dataMax)}]}/>
            <CartesianGrid vertical={false}  strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="dailyconfirmed" stroke="red" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="dailyrecovered" stroke="#206111" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="dailydeceased" stroke="#525050" activeDot={{r: 8}}/>
            </LineChart>        
          </div>
        </>
    );
}
export default LineGraph;