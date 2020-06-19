import React , {useState, useEffect, useContext}from 'react';
import './DisplayTotal.scss';
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FetchDataContext} from '../context/fetch-data';
import LineChartComponent from '../GraphComponent/LineChartComponent/LineChartComponent';
import TinyAreaGraph from '../GraphComponent/TinyAreaGraph/TinyAreaGraph';
import {ThemeContext} from '../context/theme';
import CountUp from 'react-countup';
const monthList = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
};
const getCurrentMonth = ()=>{
    let selectedMonth = new Date().getDate() < 10 ? new Date().getMonth() : new Date().getMonth() + 1;
    return monthList[selectedMonth];
};
const DisplayTotal = props =>{

    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const statewise = fetchCovidData.statewise[0];
    const [latestData,setLatestData] = useState([]);
    const {thememode} = useContext(ThemeContext);
    useEffect(()=>{
        let filterArray = [];
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
            filterArray = casesTimeSeries.filter( (item)=>item.date.includes(getCurrentMonth() ));
            filterArray.map((item) => {
                item.dailyconfirmed = parseInt(item.dailyconfirmed);
                item.dailydeceased  = parseInt(item.dailydeceased);
                item.dailyrecovered = parseInt(item.dailyrecovered);
                item.dailyactive    = item.dailyconfirmed - (item.dailyrecovered + item.dailydeceased);
                item.totalconfirmed = parseInt(item.totalconfirmed);
                item.totaldeceased = parseInt(item.totaldeceased);
                item.totalrecovered = parseInt(item.totalrecovered);
                item.totalactive =    item.totalconfirmed - (item.totalrecovered + item.totaldeceased);
                return item;
            });
            setLatestData(filterArray);
        }
    },[casesTimeSeries]);

    return (
    <>  
            <div className={`container ${thememode}`}>
                <div className={`display-total ${thememode}`}>
                    {statewise && 
                        <>
                        <div className={`display-total__block ${thememode}`}>
                            <div className={`display-total__text confirmed`}>
                                {"Confirmed"}
                            </div>
                            <div className={`display-total__count-block`}>
                                <div className="display-total__count">
                                    <CountUp
                                    start={200000}
                                    end={parseInt(statewise.confirmed)}
                                    duration={2.1}
                                    separator=","
                                    />                              
                                </div>
                                
                                <div className="display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="display-total__icon"/>
                                    [+{statewise.deltaconfirmed}]
                                </div>
                                
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyconfirmed"} fillcolor={"red"}/>
                        </div>

                        <div className={`display-total__block ${thememode}`}>
                            <div className={`display-total__text recovered`}>
                                {"Recovered"}
                            </div>
                            <div className={`display-total__count-block`}>
                                <div className="display-total__count">
                                    <CountUp
                                    start={200000}
                                    end={parseInt(statewise.recovered)}
                                    duration={2.1}
                                    separator=","
                                    />
                                </div>
                                <div className="display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="display-total__icon"/>
                                    [+{statewise.deltarecovered}]
                                </div>
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyrecovered"} fillcolor={"green"}/>
                        </div>
                        {/* <div className={`display-total__block`}>
                            <div className={`display-total__text`}>
                                {"Active"}
                            </div>
                            <div className={`display-total__count-block`}>
                                <div className="display-total__count">
                                    {statewise.active}
                                </div>
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyactive"} fillcolor={"green"}/>
                        </div>     */}

                        <div className={`display-total__block ${thememode}`}>
                            <div className={`display-total__text deaths`}>
                                {"Deaths"}
                            </div>
                            <div className={`display-total__count-block`}>
                                <div className="display-total__count">
                                    <CountUp
                                    start={0}
                                    end={parseInt(statewise.deaths)}
                                    duration={2.1}
                                    separator=","
                                    />
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
                <div className="display-line-chart-container">
                    <LineChartComponent/>
                </div>
            </div>   
        </>
    );
};

export default DisplayTotal;