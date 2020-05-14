
import React, { useEffect, useState, useReducer, useContext} from 'react';
import './RechartComponent.scss';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,BarChart,Bar
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';

const RechartComponent = props =>{
    const [latestData,setLatestData] = useState([]);
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    let filterArray = [];
    useEffect(()=>{
      //console.log("called use");
      if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
        filterArray = casesTimeSeries.filter( (data)=>data.date.includes("May"));
        setLatestData(filterArray);
      }
      return ()=>{
        console.log("Cleanup runss");
      }
  },[casesTimeSeries]); 
    return (
        <>
            <div className="line-chart-container">
                <div className="line-chart">
                        <BarChart width={730} height={250} data={latestData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date"/>
                        <YAxis />
                        <Tooltip />
                       
                        <Bar dataKey="dailyconfirmed" fill="red" />
                        <Bar dataKey="dailyrecovered" fill="green" />
                        <Bar dataKey="dailydeceased" fill="yellow" />
                        </BarChart>                        
                </div>
            </div>
        </>
    );
}
export default RechartComponent;