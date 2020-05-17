import React, {useEffect, useState,useContext} from 'react';
import './SyncAreaComponent.scss';
import SynchronizedAreaChart from '../SynchronizedAreaChart/SynchronizedAreaChart';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
import {FetchDataContext} from '../../context/fetch-data';

const SyncAreaComponent = props =>{
    const [filterData, setFilterData ] = useState({month:"May"});
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const [latestData,setLatestData] = useState([]);
    let filterArray = [];
    const onSelectDropdown = (value)=>{
        console.log("value.. ",value);
        if(value && value.type === "months"){
            setFilterData({...filterData,month:value.selectedtype});
        }
    }
    const createFilterArray = ()=>{
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
            filterArray = casesTimeSeries.filter( (item)=>item.date.includes(filterData.month));
            setLatestData(filterArray);
        }
    }
    useEffect(()=>{
        console.log("common");
        setLatestData(casesTimeSeries);
    },[casesTimeSeries,filterData]);
    useEffect(()=>{
        createFilterArray();
    },[filterData]);
    return (
        <> 
            <div className="sync-description-graph">
                <div className="sync-dropdown-container">
                    <h3 className="sync-caseheading">Daily Cases </h3>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/>
                </div>
                <SynchronizedAreaChart latestData= {latestData} />
            </div>
        </>
    );
};

export default SyncAreaComponent;