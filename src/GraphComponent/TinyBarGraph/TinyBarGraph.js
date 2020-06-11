
import React, { useEffect, useState} from 'react';
import './TinyBarGraph.scss';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Legend}from 'recharts';

import useDeviceAgent from '../../hooks/device-agent';

const TinyBarGraph = props =>{
    const {device} = useDeviceAgent();
    const [chartWidth, setChartWidth] = useState(800);
    const [chartHeight, setChartHeight] = useState(400);
    const {filterCaseType} = props;
    const radius = 30;
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
        setChartWidth(320);setChartHeight(200);
      }
    },[device]);
    const renderCustomizedLabel = (props) => {
      const { x, y, width, height, value } = props;
      return (
        <g>
          <text x={x + width / 2} y={y - 10} fill="green" textAnchor="middle" dominantBaseline="central" className="count-label">
            {value}
          </text>
        </g>
      );
    };
    const CustomizedAxisTick = (props) =>{

        const {x, y, stroke, payload} = props;
        
         return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} className="xaxis-label" textAnchor="middle" fill="#666" transform="rotate(0)">{`${payload.value.slice(0,7)}${payload.value.length > 7 ?'...':''}`}</text>
          </g>
        );
    }
    const caseType = ()=>{
      switch(filterCaseType) {
        case 'Confirmed':
          return (            
              <Bar barSize={25} dataKey= {props.dataKey.confirmed} fill="red" >
                <LabelList dataKey= {props.dataKey.confirmed} content={renderCustomizedLabel}/>
              </Bar>
            )
        case 'Recovered':
          return (
            <Bar barSize={25} dataKey= {props.dataKey.recovered} fill="green" >
                <LabelList dataKey= {props.dataKey.recovered} content={renderCustomizedLabel} />
              </Bar>
          )
        case 'Deceased':
            return (
              <Bar barSize={25} dataKey= {props.dataKey.deceased} fill="grey" >
                <LabelList dataKey= {props.dataKey.deceased} content={renderCustomizedLabel} />
              </Bar>
            )
        case 'Active':
              return (
                <Bar barSize={25} dataKey= {props.dataKey.active} fill="blue" >
                <LabelList dataKey= {props.dataKey.active} content={renderCustomizedLabel} />
              </Bar>
              )
        default:
          return (
           <>
            </>
           )
      }
    };
    
    return (
        <>
           
                <div className="tiny-bar-chart">
                  <BarChart width={chartWidth} height={chartHeight}   data={props.latestData}
                        margin={{top: 15, right: 30, left: 20, bottom: 5}}>
                    <XAxis interval={0} dataKey={props.xDataKey} tick={<CustomizedAxisTick/>}/>
                    <Tooltip/>
                    {caseType()}            
                  </BarChart>       
                </div>
            
        </>
    );
}
export default TinyBarGraph;