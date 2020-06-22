import React , {useState, useEffect, useContext}from 'react';
import './StateWiseDisplayTotal.scss';
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FetchDataContext} from '../context/fetch-data';
import BarChartComponentState from '../GraphComponent/BarChartComponentState/BarChartComponentState';
import {withRouter} from 'react-router-dom';
import TinyAreaGraph from '../GraphComponent/TinyAreaGraph/TinyAreaGraph';
import {ThemeContext} from '../context/theme';
import CountUp from 'react-countup';
import {Helmet, HelmetProvider} from 'react-helmet-async';
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
const StateWiseDisplayTotal = props =>{
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
        <HelmetProvider>
            <Helmet>
                <meta
                name="title"
                content="COVID-19 Tracker India All states district cases count"
                />
                <meta
                name="description"
                content="COVID-19 Tracker India All states district cases confirmed recovered active"
                />
            </Helmet>
        </HelmetProvider>
        {props.match.params.statecode ===  'allstates' &&
        <div className={`statewise-container ${thememode}`}>
            <div className={`statewise-display-total ${thememode}`}>
                {statewise && 
                    <>
                    <div className={`statewise-display-total__block ${thememode}`}>
                        <div className={`statewise-display-total__text confirmed`}>
                            {"Confirmed"}
                        </div>
                        <div className={`statewise-display-total__count-block`}>
                            <div className="statewise-display-total__count">
                                <CountUp
                                start={200000}
                                end={parseInt(statewise.confirmed)}
                                duration={2}
                                separator=","
                                />
                            </div>
                            
                            <div className="statewise-display-total__increase">
                                <FontAwesomeIcon icon={faArrowUp}  size="lg" className="statewise-display-total__icon"/>
                                [+{Math.abs(parseInt(statewise.deltaconfirmed))}]
                            </div>
                            
                        </div>
                        <TinyAreaGraph latestData= {latestData} dataKey={"dailyconfirmed"} fillcolor={"red"}/>
                    </div>

                    <div className={`statewise-display-total__block ${thememode}`}>
                        <div className={`statewise-display-total__text recovered`}>
                            {"Recovered"}
                        </div>
                        <div className={`statewise-display-total__count-block`}>
                            <div className="statewise-display-total__count">
                                <CountUp
                                start={200000}
                                end={parseInt(statewise.recovered)}
                                duration={2}
                                separator=","
                                />
                            </div>
                            
                            <div className="statewise-display-total__increase">
                                <FontAwesomeIcon icon={faArrowUp}  size="lg" className="statewise-display-total__icon"/>
                                [+{Math.abs(parseInt(statewise.deltarecovered))}]
                            </div>
                            
                        </div>
                        <TinyAreaGraph latestData= {latestData} dataKey={"dailyrecovered"} fillcolor={"green"}/>
                    </div>
                    <div className={`statewise-display-total__block ${thememode}`}>
                        <div className={`statewise-display-total__text active`}>
                            {"Active"}
                        </div>
                        <div className={`statewise-display-total__count-block`}>
                            <div className="statewise-display-total__count">
                                <CountUp
                                start={0}
                                end={parseInt(statewise.active)}
                                duration={2}
                                separator=","
                                />
                            </div>
                        </div>
                        <TinyAreaGraph latestData= {latestData} dataKey={"dailyactive"} fillcolor={"blue"}/>
                    </div>    
                    <div className={`statewise-display-total__block ${thememode}`}>
                        <div className={`statewise-display-total__text deaths`}>
                            {"Deaths"}
                        </div>
                        <div className={`statewise-display-total__count-block`}>
                            <div className="statewise-display-total__count">
                                <CountUp
                                start={0}
                                end={parseInt(statewise.deaths)}
                                duration={2}
                                separator=","
                                />
                            </div>
                            
                            <div className="statewise-display-total__increase">
                                <FontAwesomeIcon icon={faArrowUp}  size="lg" className="statewise-display-total__icon"/>
                                [+{Math.abs(parseInt(statewise.deltadeaths))}]
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