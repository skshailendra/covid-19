
import React, { useEffect, useState,useContext} from 'react';
import './PieGraph.scss';
import {
  PieChart, Pie, Sector, Cell
  } from 'recharts';

import useDeviceAgent from '../../hooks/device-agent';
import {ThemeContext} from '../../context/theme';
const PieGraph = props =>{
    const {device} = useDeviceAgent();
    const [chartWidth, setChartWidth] = useState(800);
    const [chartHeight, setChartHeight] = useState(400);
    const [activeIndex, setActiveIndex] = useState(0);
    const [chartCx, setChartCx] = useState(200);
    const [chartCy, setChartCy] = useState(180);
    const totcx = 170,totcy = 75;
    const COLORS = ['#ea8888', '#00C49F', '#989898'];
    const {thememode} = useContext(ThemeContext);
    const onPieEnter = (data, index) =>{
      setActiveIndex(index);
    };
    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
      let sx, sy, mx, my,ex;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      sx = cx + (outerRadius + 5) * cos;
      sy = cy + (outerRadius + 5) * sin;
      mx = cx + (outerRadius + 5) * cos;
      my = cy + (outerRadius + 20) * sin;
      ex = mx + (cos >= 0 ? 1 : -1) * 15;

      if(device && !device.isSmallDevice){
        sx = cx + (outerRadius + 10) * cos;
        sy = cy + (outerRadius + 10) * sin;
        mx = cx + (outerRadius + 30) * cos;
        my = cy + (outerRadius + 30) * sin;
        ex = mx + (cos >= 0 ? 1 : -1) * 22;
      }
      const ey = my ;
      const textAnchor = cos >= 0 ? 'start' : 'end';
    
      return (

        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" className="payloadName" fill={fill}>{payload.name}</text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 8}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
          <circle cx={ex} cy={ey} r={1.5} fill={fill} stroke="none"/>
          {
            (device && !device.isSmallDevice) &&
            <text x={ex} y={ey} textAnchor={textAnchor} className={`total ${thememode}`}>{`Total ${value}`}</text>
          }
          {
          (device && device.isSmallDevice) &&
          <text x={totcx} y={totcy} textAnchor={textAnchor} className={`total ${thememode}`}>{`Total: ${value}`}</text>
          }
            <text x={ex} y={ey} dy={18} textAnchor={textAnchor} fill="green">
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };

    useEffect(()=>{
      if(device && device.isExtraLargeDevice){
        setChartWidth(530);setChartHeight(400);
      }
      if(device && device.isLargeDevice){
        setChartWidth(600);setChartHeight(400);
      }
      if(device && device.isMediumDevice){
        setChartCx(250);setChartCy(200);
        setChartWidth(600);setChartHeight(400);
      }
      if(device && device.isSmallDevice){
        setChartCx(140);setChartCy(200);
        setChartWidth(300);setChartHeight(400);
      }
    },[device]);
    
    return (
        <>
             <div className={`pie-chart ${thememode}`}>
             <PieChart width={chartWidth} height={chartHeight}>
        <Pie 
          activeIndex={activeIndex}
          dataKey="value"
          activeShape={renderActiveShape} 
          data={props.latestData} 
          cx={chartCx}
          cy={chartCy} 
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          onMouseEnter={onPieEnter}
        
          >
        	{props.latestData &&
          	props.latestData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
          </Pie>
       </PieChart>
       </div>
        </>
    );
}
export default PieGraph;