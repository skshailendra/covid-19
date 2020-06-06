
import React, { useEffect, useState} from 'react';
import './BarGraph.scss';
import {
  XAxis, YAxis, Tooltip,BarChart,Bar,
  } from 'recharts';

import useDeviceAgent from '../../hooks/device-agent';

const BarGraph = props =>{
    const {device} = useDeviceAgent();
    const [chartWidth, setChartWidth] = useState(800);
    const [chartHeight, setChartHeight] = useState(400);
    const {filterCaseType} = props;
    useEffect(()=>{
      if(device && device.isExtraLargeDevice){
        setChartWidth(600);setChartHeight(400);
      }
      if(device && device.isLargeDevice){
        setChartWidth(600);setChartHeight(400);
      }
      if(device && device.isMediumDevice){
        setChartWidth(600);setChartHeight(400);
      }
      if(device && device.isSmallDevice){
        setChartWidth(300);setChartHeight(300);
      }
    },[device]);
    const caseType = ()=>{
      switch(filterCaseType) {

        case 'totalconfirmed':
          return (            
              <Bar dataKey="dailyconfirmed" fill="red" />
            )
        case 'totalrecovered':
          return (
            <Bar dataKey="dailyrecovered" fill="#206111" />
          )
        case 'totaldeceased':
            return (
              <Bar dataKey="dailydeceased" fill="#525050" />
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
                       
                        
                        {props.filterCaseType =='all'&&<Bar dataKey="totalconfirmed" fill="red" />}
                        {props.filterCaseType =='all' &&<Bar dataKey="totalrecovered" fill="#206111" />}
                        {props.filterCaseType =='all' &&<Bar dataKey="totaldeceased" fill="#525050" /> }
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