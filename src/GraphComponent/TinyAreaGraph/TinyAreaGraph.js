
import React, { useEffect, useState} from 'react';
import './TinyAreaGraph.scss';
import {
  AreaChart, Area
  } from 'recharts';

import useDeviceAgent from '../../hooks/device-agent';

const TinyAreaGraph = props =>{
    const {device} = useDeviceAgent();
    const [chartWidth, setChartWidth] = useState(200);
    const [chartHeight, setChartHeight] = useState(60);
    useEffect(()=>{     
      if(device && (device.isLargeDevice || device.isExtraLargeDevice)){
        setChartWidth(300);setChartHeight(60);
      }
      if(device && device.isMediumDevice){
        setChartWidth(200);setChartHeight(60);
      }
      if(device && device.isSmallDevice){
        setChartWidth(200);setChartHeight(60);
      }
    },[device]);
    
    return (
        <>
            <div className="tiny-chart-container">
                <div className="tiny-chart">
                <AreaChart width={chartWidth} height={chartHeight} data={props.latestData}
                      margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                  <Area type='monotone' dataKey={props.dataKey} stroke='#8884d8' fill={props.fillcolor} />
                </AreaChart>
                </div>
            </div>
        </>
    );
}
export default TinyAreaGraph;