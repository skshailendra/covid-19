import React , {useState, useEffect, useContext}from 'react';
import './DisplayTotal.scss';
import caseTimeSeries from '../data/caseTimeSeries';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,BarChart,Bar
  } from 'recharts';
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FetchDataContext} from '../context/fetch-data';
const DisplayTotal = props =>{

    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const [latestData,setLatestData] = useState([]);
    const [dailyData, setDailyData] = useState();
    const [tinyLineChart,setTinyLineChart] = useState([]);
    const dataJsonUrl = 'https://api.covid19india.org/data.json';
    const requestOption = {
        method:"GET"
    };
    let filterArray = [];
    const fetchData = async()=>{
        const response = await fetch(dataJsonUrl,requestOption);
        if(response.ok){
            let resJson = await response.json();
            return resJson;
        }else{
            throw Error("Unable to fetch the data");
        }
    };
    const convertToInt = (data)=>{
        for (let itr in data){
            if(data.hasOwnProperty(itr) && typeof data[itr] === 'string' && !data[itr].includes("May")){
               data[itr] = parseInt(data[itr]);
            }
        }
        return data;
    }
    const filterData = () =>{
        
        filterArray = casesTimeSeries.filter( (data)=>data.date.includes("May"));
        const newFilterArray = filterArray.map((data,idx)=>{
            return data = convertToInt(data);        
        });
        console.log(newFilterArray);
        setTinyLineChart(newFilterArray);
    };
    useEffect(()=>{
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
            const length = casesTimeSeries.length;
            const todaysData = casesTimeSeries[length-1];
            todaysData.totalactive = (parseInt(todaysData.totalconfirmed) - (parseInt(todaysData.totalrecovered) + parseInt(todaysData.totaldeceased)) ).toString();

            const confirmedObj = {
                totalCount:todaysData.totalconfirmed,
                increaseCount:todaysData.dailyconfirmed,
                styleClass:"confirmed-case",
                arrowColor:"#f31a1a",
                label : "Total Confirmed",
            };
            const recoveredObj = {
                totalCount:todaysData.totalrecovered,
                increaseCount:todaysData.dailyrecovered,
                styleClass:"recovered-case",
                arrowColor:"#92de92",
                label : "Total Recovered",
            };
            const activeObj = {
                totalCount:todaysData.totalactive,
                increaseCount:null,
                styleClass:"active-case",
                label : "Total Active",
            };
            const deceasedObj = {
                totalCount:todaysData.totaldeceased,
                increaseCount:todaysData.dailydeceased,
                styleClass:"deceased-case",
                arrowColor:"#ad9797",
                label : "Total Deceased",
            };
            const latestData = [];
            latestData.push(confirmedObj,recoveredObj,activeObj,deceasedObj);
            setLatestData(latestData);

            filterData();
        }
    },[casesTimeSeries]); 
    
    return (
    <>  
            <div className="display-total">
                {latestData && 
                    latestData.map((data,key)=> 
                        (
                        <div className={`display-total__block`} key = {key}>
                            <div className="display-total__text">
                                {data.label}
                            </div>
                            <div className={`display-total__count-block display-total__${data.styleClass}`}>
                                <div className="display-total__count">
                                    {data.totalCount}
                                </div>
                                {data.increaseCount && 
                                <div className="display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" color={data.arrowColor} className="display-total__icon"/>
                                    [+{data.increaseCount}]
                                </div>
                                }
                            </div>
                        </div>
                        )
                    )
                }                
            </div>
            {/* <div className="line">
                {
                    tinyLineChart && <>
                    <div className={`line__block`}>
                        <LineChart width={265} height={100} data={tinyLineChart} compact={true}>             
                            <Line dot ={false} type='monotone' dataKey='dailyconfirmed' stroke='#8884d8' strokeWidth={2} />                            
                        </LineChart>  
                    </div>
                    <div className={`line__block`}>
                    <LineChart width={265} height={100} data={tinyLineChart}>             
                        <Line dot ={false} type='monotone' dataKey='dailyrecovered' stroke='#82ca9d' strokeWidth={2} />                            
                    </LineChart>   
                    </div>
                    <div className={`line__block`}>
                    <LineChart width={265} height={100}data={tinyLineChart}>             
                        <Line dot ={false} type='monotone' dataKey='dailyrecovered' stroke='#8884d8' strokeWidth={2} />                            
                    </LineChart>  
                    </div> 
                    <div className={`line__block`}>
                    <LineChart width={265} height={100}data={tinyLineChart}>             
                        <Line dot ={false} type='monotone' dataKey='dailydeceased' stroke='#9e9191' strokeWidth={2} />                            
                    </LineChart>   
                    </div>
                    </>
                }
            </div> */}
        </>
    );
};

export default DisplayTotal;