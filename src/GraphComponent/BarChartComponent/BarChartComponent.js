import React, {useEffect, useState,useContext} from 'react';
import './BarChartComponent.scss';
import BarGraph from '../BarGraph/BarGraph';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
import {FetchDataContext} from '../../context/fetch-data';
import PieChartComponent from '../PieChartComponent/PieChartComponent';

const BarChartComponent = props =>{
    const [filterData, setFilterData ] = useState({month:"" , caseType:'all'});
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const [latestData,setLatestData] = useState([]);
    let filterArray = [];
    const onSelectDropdown = (value)=>{
        console.log("value.. ",value);
        if(value && value.type === "months"){
            value.selectedtype = value.selectedtype === 'All' ? '' : value.selectedtype;
            setFilterData({...filterData,month:value.selectedtype});
        }else{
            setFilterData({...filterData,caseType:value.selectedtype})
        }
    }
    const createFilterArray = ()=>{
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
        
            filterArray = casesTimeSeries.filter( (item)=>item.date.includes(filterData.month));
            filterArray.map((item) => {
                item.dailyconfirmed = parseInt(item.dailyconfirmed);
                item.dailydeceased = parseInt(item.dailydeceased);
                item.dailyrecovered = parseInt(item.dailyrecovered);
                item.totalconfirmed = parseInt(item.totalconfirmed);
                item.totalconfirmed = parseInt(item.totaldeceased);
                item.totalconfirmed = parseInt(item.totalrecovered);
            });
            setLatestData(filterArray);
        }
    }
    useEffect(()=>{
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
                <PieChartComponent/>
            </div>
        </>
    );
};

export default BarChartComponent;