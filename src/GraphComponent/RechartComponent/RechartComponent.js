
import React, { useEffect, useState, useReducer, useContext} from 'react';
import './RechartComponent.scss';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,BarChart,Bar
  } from 'recharts';

import {FetchDataContext} from '../../context/fetch-data';
const httpReducer = (httpState, action) =>{
  switch(action.type){
    case 'SEND' :
      return {};
  }
};
const RechartComponent = props =>{
    const [latestData,setLatestData] = useState([]);
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;

    let filterArray = [];
    const dataJsonUrl = 'https://api.covid19india.org/data.json';
    const requestOption = {
        method:"GET"
    };
    const fetchData = async()=>{
      const response = await fetch(dataJsonUrl,requestOption);
      if(response.ok){
          let resJson = await response.json();
          return resJson;
      }else{
          throw Error("Unable to fetch the data");
      }
    };
    useEffect(()=>{
      console.log("called use");
      if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
        filterArray = casesTimeSeries.filter( (data)=>data.date.includes("May"));
        // const newFilterArray = filterArray.map((data,idx)=>{
        //     return data = convertToInt(data);        
        // });
        setLatestData(filterArray);
      }
      return ()=>{
        console.log("Cleanup runss");
      }
  },[casesTimeSeries]); 
    console.log("Line Chart");
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