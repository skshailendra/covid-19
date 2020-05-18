
import React, { useEffect, useState} from 'react';
import './TinyAreaGraph.scss';
import {
  AreaChart, Area
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';
import useDeviceAgent from '../../hooks/device-agent';

const TinyAreaGraph = props =>{
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
                <AreaChart width={200} height={60} data={props.latestData}
                      margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                  <Area type='monotone' dataKey={props.dataKey} stroke='#8884d8' fill={props.fillcolor} />
                </AreaChart>
                </div>
            </div>
        </>
    );
}
export default TinyAreaGraph;