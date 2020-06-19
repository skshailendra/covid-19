import React, {useEffect, useState,useContext} from 'react';
import './BarChartComponent.scss';
import BarGraph from '../BarGraph/BarGraph';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
import {FetchDataContext} from '../../context/fetch-data';
import PieChartComponent from '../PieChartComponent/PieChartComponent';
import Loading from '../../UIComponent/Loading/Loading';
import {ThemeContext} from '../../context/theme';
const BarChartComponent = props =>{
    const [filterData, setFilterData ] = useState({month:"" , caseType:'all'});
    const fetchCovidData = useContext(FetchDataContext);
    const casesTimeSeries = fetchCovidData.casesTimeSeries;
    const [latestData,setLatestData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {thememode} = useContext(ThemeContext);
    const dataKey = {
        dailyconfirmed: "dailyconfirmed",
        dailyrecovered: "dailyrecovered",
        dailydeceased : "dailydeceased"
    }
    const onSelectDropdown = (value)=>{
        if(value && value.type === "months"){
            value.selectedtype = value.selectedtype === 'All' ? '' : value.selectedtype;
            setFilterData({...filterData,month:value.selectedtype});
        }else{
            setFilterData({...filterData,caseType:value.selectedtype})
        }
    }
    
    useEffect(()=>{
        let filterArray = [];
        if(Array.isArray(casesTimeSeries) && casesTimeSeries.length > 0){
        
            filterArray = casesTimeSeries.filter( (item)=>item.date.includes(filterData.month));
            filterArray.map((item) => {
                item.dailyconfirmed = parseInt(item.dailyconfirmed);
                item.dailydeceased = parseInt(item.dailydeceased);
                item.dailyrecovered = parseInt(item.dailyrecovered);
                item.totalconfirmed = parseInt(item.totalconfirmed);
                item.totalconfirmed = parseInt(item.totaldeceased);
                item.totalconfirmed = parseInt(item.totalrecovered);
                return item;
            });
            setLatestData(filterArray);
        }
    },[casesTimeSeries,filterData]);
    useEffect(()=>{
        if(latestData && latestData.length > 0){
            setIsLoading(false);
        }
       return(()=>setIsLoading(false))
    },[latestData]);
    return (
        <> 
            <div className={`bar-description-graph ${thememode}`}>
                <div className={`bar-dropdown-container ${thememode}`}>
                    <h3 className="bar-caseheading">Total Cases: </h3>
                    <DropdownComponent type ={"casetype"} selectDropdown = {e=>onSelectDropdown(e)}/>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/>
                </div>
               
                <div className="bar-graph-component">
                {latestData  && 
                    <>
                        <BarGraph latestData= {latestData} filterCaseType = {filterData.caseType}  dataKey={dataKey} xDataKey={"date"}/>
                        <div className={`bar-description-abbr `}>
                            <div className={`bar-abbr-status ${thememode}`}>
                                <span className={`bar-abbr-status__confirmed bar-abbr-status__bar-abbr-color`}></span><span>Confirmed</span>
                            </div>
                            <div className={`bar-abbr-status ${thememode}`}> 
                                <span className={`bar-abbr-status__confirmed bar-abbr-status__bar-abbr-color`}></span><span>Recovered</span>
                            </div>
                            <div className={`bar-abbr-status ${thememode}`}>
                                <span className={`bar-abbr-status__confirmed bar-abbr-status__bar-abbr-color`}></span><span>Deceased</span>
                            </div>
                        </div>
                    </>
                    }
                    {isLoading &&
                    <Loading/>
                    }
                </div>  
                         
                <PieChartComponent/>
                
            </div>
        </>
    );
};

export default BarChartComponent;