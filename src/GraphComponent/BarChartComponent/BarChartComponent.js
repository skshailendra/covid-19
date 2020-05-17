import React, {useEffect, useState,useContext} from 'react';
import './BarChartComponent.scss';
import BarGraph from '../BarGraph/BarGraph';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
import {FetchDataContext} from '../../context/fetch-data';

const BarChartComponent = props =>{
    const [filterData, setFilterData ] = useState({month:"May" , caseType:'all'});
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const [latestData,setLatestData] = useState([]);
    let filterArray = [];
    const onSelectDropdown = (value)=>{
        console.log("value.. ",value);
        if(value && value.type === "months"){
            setFilterData({...filterData,month:value.selectedtype});
        }else{
            setFilterData({...filterData,caseType:value.selectedtype})
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
        createFilterArray();
    },[casesTimeSeries,filterData]);

    return (
        <> 
            <div className="bar-description-graph">
                <div className="bar-dropdown-container">
                    <h3 className="bar-caseheading">Total Cases: </h3>
                    <DropdownComponent type ={"casetype"} selectDropdown = {e=>onSelectDropdown(e)}/>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/>
                </div>
                <BarGraph latestData= {latestData} filterCaseType = {filterData.caseType}/>
            </div>
        </>
    );
};

export default BarChartComponent;