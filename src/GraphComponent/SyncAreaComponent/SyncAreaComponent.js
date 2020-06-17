import React, {useEffect, useState,useContext} from 'react';
import './SyncAreaComponent.scss';
import SynchronizedAreaChart from '../SynchronizedAreaChart/SynchronizedAreaChart';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
import {FetchDataContext} from '../../context/fetch-data';
import {ThemeContext} from '../../context/theme';
const SyncAreaComponent = props =>{
    const [filterData, setFilterData ] = useState({month:"June"});
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const [latestData,setLatestData] = useState([]);
    const {thememode} = useContext(ThemeContext);
    let filterArray = [];
    const onSelectDropdown = (value)=>{
        if(value && value.type === "months"){
            value.selectedtype = value.selectedtype === 'All' ? '' : value.selectedtype;
            setFilterData({...filterData,month:value.selectedtype});
        }
    }
    const createFilterArray = ()=>{
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
            filterArray = casesTimeSeries.filter( (item)=>item.date.includes(filterData.month));
            filterArray.map((item) => {
                item.dailyconfirmed = parseInt(item.dailyconfirmed);
                item.dailydeceased = parseInt(item.dailydeceased);
                item.dailyrecovered = parseInt(item.dailyrecovered);
                return item;
            });
            setLatestData(filterArray);
        }
    }
    useEffect(()=>{
        createFilterArray();
    },[casesTimeSeries,filterData]);
    return (
        <> 
            <div className={`sync-description-graph ${thememode}`}>
                <div className={`sync-dropdown-container ${thememode}`}>
                    <h3 className="sync-caseheading">Daily Cases </h3>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/>
                </div>
                <SynchronizedAreaChart latestData= {latestData} />
            </div>
        </>
    );
};

export default SyncAreaComponent;