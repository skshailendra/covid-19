import React, {useEffect, useState,useContext, useCallback} from 'react';
import './LineChartComponent.scss';
import LineGraph from '../LineGraph/LineGraph';
import {FetchDataContext} from '../../context/fetch-data';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
import Loading from '../../UIComponent/Loading/Loading';
import {ThemeContext} from '../../context/theme';
const LineChartComponent = props =>{

    const [filterData, setFilterData ] = useState({month:""});
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const [latestData,setLatestData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {thememode} = useContext(ThemeContext);
    let filterArray = [];
    const onSelectDropdown = useCallback((value)=>{
        if(value && value.type === "months"){
            value.selectedtype = value.selectedtype === 'All' ? '' : value.selectedtype;
            setFilterData({...filterData,month:value.selectedtype});
        }
    });
    const createFilterArray = ()=>{
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
            filterArray = casesTimeSeries.filter( (item)=>item.date.includes(filterData.month));
            filterArray.map((item) => {
                item.dailyconfirmed = parseInt(item.dailyconfirmed);
                item.dailydeceased = parseInt(item.dailydeceased);
                item.dailyrecovered = parseInt(item.dailyrecovered);
            });
           
            setLatestData(filterArray);
        }
    }
    useEffect(()=>{
        createFilterArray();
    },[casesTimeSeries,filterData]);
    useEffect(()=>{
        if(latestData && latestData.length > 0){
            setIsLoading(false);
        }
       return(()=>setIsLoading(false))
    },[latestData]);
    return (
        <> 
            <div className={`line-description-graph ${thememode}`}>
               
                <div className={`line-dropdown-container ${thememode}`}>
                    <h3 className="line-caseheading">Daily Cases: </h3>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/>
                </div>
                <div className="line-chart-component">
                {latestData  && 
                    <LineGraph latestData={latestData}/>
                }
                {isLoading &&
                    <Loading/>
                }
                </div>
            </div>
        </>
    );
};

export default LineChartComponent;