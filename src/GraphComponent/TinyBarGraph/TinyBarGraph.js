
import React, { useEffect, useState,useContext} from 'react';
import './TinyBarGraph.scss';
import {BarChart, Bar, XAxis, Tooltip, LabelList}from 'recharts';

import useDeviceAgent from '../../hooks/device-agent';
import {ThemeContext} from '../../context/theme';

const TinyBarGraph = props =>{
    const {device} = useDeviceAgent();
    const [chartWidth, setChartWidth] = useState(800);
    const [chartHeight, setChartHeight] = useState(400);
    const {nightMode,thememode} = useContext(ThemeContext);
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
        setChartWidth(320);setChartHeight(200);
      }
    },[device]);
    const renderCustomizedLabel = (props) => {
      const { x, y, width, value } = props;
      return (
        <g>
          <text x={x + width / 2} y={y - 10} fill="green" textAnchor="middle" dominantBaseline="central" className="count-label">
            {value}
          </text>
        </g>
      );
    };
    const CustomizedAxisTick = (props) =>{

        const {x, y, payload} = props;
        
         return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} className={`xaxis-label ${thememode}`} textAnchor="middle" fill={nightMode? "#fff":"#666"} transform="rotate(0)">{`${payload.value.slice(0,7)}${payload.value.length > 7 ?'...':''}`}</text>
          </g>
        );
    }
    const tooltipContent = (tooltipProps) => {
     
      let payload;
      if(tooltipProps.payload && tooltipProps.payload.length>0){
        debugger;
        payload = tooltipProps.payload[0];
      }
      return <div className={`custom-tooltip ${thememode}`}>
        { payload && <>
          <h4 className="tooltip-heading">{payload.payload.district}</h4>
          <span  className="confirmed">Confirmed: {payload.payload.confirmed}</span> 
          <span className="recovered">Recovered:{payload.payload.recovered}</span>
          <span className="active">Active: {payload.payload.active}</span>
          <span className="death">Death: {payload.payload.deceased}</span>          
          </>
        }
        </div>
    }
    // const caseType = ()=>{
    //   switch(filterCaseType) {
    //     case 'Confirmed':
    //       return (            
    //           <Bar barSize={25} dataKey= {props.dataKey.confirmed} fill="#e26868" >
    //             <LabelList dataKey= {props.dataKey.confirmed} content={renderCustomizedLabel}/>
    //           </Bar>
    //         )
    //     case 'Recovered':
    //       return (
    //         <Bar barSize={25} dataKey= {props.dataKey.recovered} fill="#78b16b" >
    //             <LabelList dataKey= {props.dataKey.recovered} content={renderCustomizedLabel} />
    //           </Bar>
    //       )
    //     case 'Deceased':
    //         return (
    //           <Bar barSize={25} dataKey= {props.dataKey.deceased} fill="grey" >
    //             <LabelList dataKey= {props.dataKey.deceased} content={renderCustomizedLabel} />
    //           </Bar>
    //         )
    //     case 'Active':
    //           return (
    //             <Bar barSize={25} dataKey= {props.dataKey.active} fill="#7e78f7" >
    //             <LabelList dataKey= {props.dataKey.active} content={renderCustomizedLabel} />
    //           </Bar>
    //           )
    //     default:
    //       return (
    //        <>
    //         </>
    //        )
    //   }
    // };
    
    return (
        <>
           
                <div className={`"tiny-bar-chart ${thememode}`} id="tiny-bar-chart">
                  <BarChart width={chartWidth} height={chartHeight}   data={props.latestData}
                        margin={{top: 15, right: 30, left: 20, bottom: 5}}>
                    <XAxis interval={0} dataKey={props.xDataKey} tick={<CustomizedAxisTick/>}/>
                    <Tooltip content={tooltipContent}/>
                    {
                      props.filterCaseType === 'Confirmed' && 
                      <Bar barSize={25} dataKey= {props.dataKey.confirmed} fill="#e26868" >
                      <LabelList dataKey= {props.dataKey.confirmed} content={renderCustomizedLabel}/>
                      </Bar>
                    }
                    {
                      props.filterCaseType === 'Recovered' && 
                      <Bar barSize={25} dataKey= {props.dataKey.recovered} fill="#78b16b" >
                        <LabelList dataKey= {props.dataKey.recovered} content={renderCustomizedLabel} />
                      </Bar>
                    }
                    {
                      filterCaseType === 'Deceased' && 
                      <Bar barSize={25} dataKey= {props.dataKey.deceased} fill="grey" >
                        <LabelList dataKey= {props.dataKey.deceased} content={renderCustomizedLabel} />
                      </Bar>
                    }
                    {
                      props.filterCaseType === 'Active' && 
                        <Bar barSize={25} dataKey= {props.dataKey.active} fill="#7e78f7" >
                        <LabelList dataKey= {props.dataKey.active} content={renderCustomizedLabel} />
                      </Bar>
                    }
                            
                  </BarChart>       
                </div>
            
        </>
    );
}
export default TinyBarGraph;