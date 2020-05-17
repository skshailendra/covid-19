
import React, { useEffect, useState} from 'react';
import './BarGraph.scss';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,BarChart,Bar,
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';
import useDeviceAgent from '../../hooks/device-agent';

const BarGraph = props =>{
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
    const caseType = ()=>{
      console.log(filterCaseType);
      switch(filterCaseType) {

        case 'totalconfirmed':
          return (            
              <Bar dataKey="dailyconfirmed" fill="red" />
            )
        case 'totalrecovered':
          return (
            <Bar dataKey="dailyrecovered" fill="green" />
          )
        case 'totaldeceased':
            return (
              <Bar dataKey="dailydeceased" fill="yellow" />
            )
        default:
          return (
           <>
            </>
           )
      }
    }
    return (
        <>
            <div className="bar-chart-container">
                <div className="bar-chart">
                        <BarChart width={chartWidth} height={chartHeight} data={props.latestData}>
                        
                        <XAxis dataKey="date"/>
                        <YAxis />
                        <Tooltip />
                       
                        
                        {props.filterCaseType =='all'&&<Bar dataKey="dailyconfirmed" fill="red" />}
                        {props.filterCaseType =='all' &&<Bar dataKey="dailyrecovered" fill="green" />}
                        {props.filterCaseType =='all' &&<Bar dataKey="dailydeceased" fill="yellow" /> }
                        {props.filterCaseType != 'all' &&
                          caseType()
                        }
                        </BarChart>
    
                        
                </div>
            </div>
        </>
    );
}
export default BarGraph;