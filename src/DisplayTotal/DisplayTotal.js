import React , {useState, useEffect, useContext}from 'react';
import './DisplayTotal.scss';
import caseTimeSeries from '../data/caseTimeSeries';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,BarChart,Bar
  } from 'recharts';
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FetchDataContext} from '../context/fetch-data';
import PieGraph from '../GraphComponent/PieGraph/PieGraph';
import LineChartComponent from '../GraphComponent/LineChartComponent/LineChartComponent';

import TinyAreaGraph from '../GraphComponent/TinyAreaGraph/TinyAreaGraph';
import TinyGraph from '../GraphComponent/TinyGraph/TinyGraph';
const DisplayTotal = props =>{

    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const statewise = fetchCovidData.statewise[0];
    const [latestData,setLatestData] = useState([]);
    let filterArray = [];

    useEffect(()=>{
        console.log("displa");
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
            filterArray = casesTimeSeries.filter( (item)=>item.date.includes("May"));
            setLatestData(filterArray);
        }
        //setLatestData(casesTimeSeries);
        
    },[casesTimeSeries]);
    useEffect(()=>{
        console.log("statewise",statewise);
    },[statewise]);
    
    return (
    <>  
            <div className="container">
                <div className="display-total">
                    {statewise && 
                        <>
                        <div className={`display-total__block`}>
                            <div className={`display-total__text`}>
                                {"Confirmed"}
                            </div>
                            <div className={`display-total__count-block`}>
                                <div className="display-total__count">
                                    {statewise.confirmed}
                                </div>
                                
                                <div className="display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="display-total__icon"/>
                                    [+{statewise.deltaconfirmed}]
                                </div>
                                
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyconfirmed"} fillcolor={"red"}/>
                        </div>

                        <div className={`display-total__block`}>
                            <div className={`display-total__text`}>
                                {"Recovered"}
                            </div>
                            <div className={`display-total__count-block`}>
                                <div className="display-total__count">
                                    {statewise.recovered}
                                </div>
                                
                                <div className="display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="display-total__icon"/>
                                    [+{statewise.deltarecovered}]
                                </div>
                                
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyrecovered"} fillcolor={"green"}/>
                        </div>   

                        <div className={`display-total__block`}>
                            <div className={`display-total__text`}>
                                {"Deaths"}
                            </div>
                            <div className={`display-total__count-block`}>
                                <div className="display-total__count">
                                    {statewise.deaths}
                                </div>
                                
                                <div className="display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="display-total__icon"/>
                                    [+{statewise.deltadeaths}]
                                </div>
                                
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailydeceased"} fillcolor={"grey"}/>
                        </div>
                        </>   
                    }
                    
                </div>
                <div className="line-chart-container">
                    {/* <PieGraph/> */}
                    <LineChartComponent/>
                </div>
            </div>   
        </>
    );
};

export default DisplayTotal;