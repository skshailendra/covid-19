import React, { useState,useContext, useEffect} from 'react';
import './PieChartComponent.scss';
import {FetchDataContext} from '../../context/fetch-data';
import PieGraph from '../PieGraph/PieGraph';

const PieChartComponent = props =>{
    const fetchCovidData = useContext(FetchDataContext);
    const statewise = fetchCovidData.statewise[0];
    const [latestData,setLatesData] = useState();
    let createLatest = [];
    useEffect(()=>{
        if(statewise){
            const confirmed = { name : "confirmed", value :   parseInt(statewise["confirmed"])};
            const recovered = { name : "recovered", value :   parseInt(statewise["recovered"])};
            const deaths =    { name : "deaths", value :   parseInt(statewise["deaths"])};
            createLatest.push(confirmed,recovered,deaths);
            setLatesData(createLatest);
        }
    },[statewise]);
    return (
        <> 
            <div className="pie-description-graph">
                <div className="pie-dropdown-container">
                    <h3 className="bar-caseheading">Percentage Wise Analysis: </h3>
                </div>
                <PieGraph  latestData= {latestData}/>
            </div>
        </>
    );
};

export default PieChartComponent;