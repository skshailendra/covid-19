
import React, { useEffect, useState} from 'react';
import './PieGraph.scss';
import {
  PieChart, Pie, Sector, Cell
  } from 'recharts';

import useDeviceAgent from '../../hooks/device-agent';

const PieGraph = props =>{
    const {device} = useDeviceAgent();
    const [chartWidth, setChartWidth] = useState(800);
    const [chartHeight, setChartHeight] = useState(400);
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (data, index) =>{
      setActiveIndex(index);
    };
    const data = [{name: 'Confirmed', value: 90648}, 
							{name: 'Recovered', value: 34257},
              {name: 'Death', value: 2871}
             ];
            
    const COLORS = ['#ea8888', '#00C49F', '#989898'];

    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx ;
      const ey = my ;
      const textAnchor = cos >= 0 ? 'start' : 'end';
    
      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
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
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
          <circle cx={ex} cy={ey} r={1.5} fill={fill} stroke="none"/>
          <text x={ex} y={ey} textAnchor={textAnchor} fill="#333">{`Total ${value}`}</text>
          <text x={ex} y={ey} dy={18} textAnchor={textAnchor} fill="green">
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };
    const RADIAN = Math.PI / 180;                    
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);
      debugger;
    console.log("x",x , y,cx,cy);
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
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
        setChartWidth(300);setChartHeight(400);
      }
      console.log(device);
      console.log("chartwidth",chartWidth);
    },[device]);
    
    return (
        <>
             <div className="pie-chart">
             <PieChart width={350} height={300}>
        <Pie 
        	activeIndex={activeIndex}
          activeShape={renderActiveShape} 
          data={data} 
          cx={150} 
          cy={150} 
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          onMouseEnter={onPieEnter}
        
          >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
          </Pie>
       </PieChart>
       	{/* <PieChart width={500} height={500} onMouseEnter={onPieEnter}>
        <Pie
          dataKey="value"
          data={data} 
          cx={200} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart> */}
       </div>
        </>
    );
}
export default PieGraph;