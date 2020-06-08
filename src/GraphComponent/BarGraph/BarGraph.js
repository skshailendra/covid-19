
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
        setChartWidth(600);setChartHeight(600);
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
        case 'Confirmed':
          return (            
              <Bar  barSize={15} dataKey= {props.dataKey.dailyconfirmed}  fill="#ef716f" />
            )
        case 'totalrecovered':
        case 'Recovered':
          return (
            <Bar dataKey={props.dataKey.dailyrecovered}  fill="#78b16b" />
          )
        case 'totaldeceased':
        case 'Deceased':
            return (
              <Bar dataKey={props.dataKey.dailydeceased} fill="#b3b3b3" />
            )
        case 'totalactive':
        case 'Active':
              return (
                <Bar dataKey={props.dataKey.totalactive} fill="blue" />
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
                        
                        <XAxis dataKey={props.xDataKey}/>
                        <YAxis />
                        <Tooltip />
                       
                        
                        {props.filterCaseType =='all'&&<Bar dataKey="totalconfirmed" fill="#ef716f" />}
                        {props.filterCaseType =='all' &&<Bar dataKey="totalrecovered" fill="#78b16b" />}
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