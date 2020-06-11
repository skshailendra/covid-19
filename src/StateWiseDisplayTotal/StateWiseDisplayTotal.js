import React , {useState, useEffect, useContext}from 'react';
import './StateWiseDisplayTotal.scss';
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FetchDataContext} from '../context/fetch-data';
import BarChartComponentState from '../GraphComponent/BarChartComponentState/BarChartComponentState';
import {withRouter} from 'react-router-dom';
import TinyAreaGraph from '../GraphComponent/TinyAreaGraph/TinyAreaGraph';
const StateWiseDisplayTotal = props =>{

    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const statewise = fetchCovidData.statewise[0];
    const [latestData,setLatestData] = useState([]);
    let filterArray = [];
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
    useEffect(()=>{
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
            });
            setLatestData(filterArray);
        }
    },[casesTimeSeries]);

    return (
    <>  
            {props.match.params.statecode ===  'allstates' &&
            <div className="statewise-container">
                <div className="statewise-display-total">
                    {statewise && 
                        <>
                        <div className={`statewise-display-total__block`}>
                            <div className={`statewise-display-total__text`}>
                                {"Confirmed"}
                            </div>
                            <div className={`statewise-display-total__count-block`}>
                                <div className="statewise-display-total__count">
                                    {statewise.confirmed}
                                </div>
                                
                                <div className="statewise-display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="statewise-display-total__icon"/>
                                    [+{statewise.deltaconfirmed}]
                                </div>
                                
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyconfirmed"} fillcolor={"red"}/>
                        </div>

                        <div className={`statewise-display-total__block`}>
                            <div className={`statewise-display-total__text`}>
                                {"Recovered"}
                            </div>
                            <div className={`statewise-display-total__count-block`}>
                                <div className="statewise-display-total__count">
                                    {statewise.recovered}
                                </div>
                                
                                <div className="statewise-display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="statewise-display-total__icon"/>
                                    [+{statewise.deltarecovered}]
                                </div>
                                
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyrecovered"} fillcolor={"green"}/>
                        </div>
                        <div className={`statewise-display-total__block`}>
                            <div className={`statewise-display-total__text`}>
                                {"Active"}
                            </div>
                            <div className={`statewise-display-total__count-block`}>
                                <div className="statewise-display-total__count">
                                    {statewise.active}
                                </div>
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailyactive"} fillcolor={"blue"}/>
                        </div>    
                        <div className={`statewise-display-total__block`}>
                            <div className={`statewise-display-total__text`}>
                                {"Deaths"}
                            </div>
                            <div className={`statewise-display-total__count-block`}>
                                <div className="statewise-display-total__count">
                                    {statewise.deaths}
                                </div>
                                
                                <div className="statewise-display-total__increase">
                                    <FontAwesomeIcon icon={faArrowUp}  size="lg" className="statewise-display-total__icon"/>
                                    [+{statewise.deltadeaths}]
                                </div>
                                
                            </div>
                            <TinyAreaGraph latestData= {latestData} dataKey={"dailydeceased"} fillcolor={"grey"}/>
                        </div>
                        </>   
                    }
                    
                </div>
                <div className="display-line-chart-container">
                    <BarChartComponentState/>
                </div>
            </div>   
            }
        </>
    );
};

export default withRouter(StateWiseDisplayTotal);