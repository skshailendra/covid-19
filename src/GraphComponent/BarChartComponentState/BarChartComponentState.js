import React, {useEffect, useState,useContext} from 'react';
import './BarChartComponentState.scss';
import StackBarGraph from '../StackBarGraph/StackBarGraph';
import {FetchDataContext} from '../../context/fetch-data';
import {withRouter} from 'react-router-dom';
import {ThemeContext} from '../../context/theme';
const BarChartComponentState = props =>{
    const [filterData] = useState({month:"" , caseType:'all'});
    const fetchCovidData = useContext(FetchDataContext);
    const stateData = fetchCovidData.statewise || [];
    const stateDistrict = fetchCovidData.stateDistrict || [];
    const [latestData,setLatestData] = useState([]);
    const {thememode} = useContext(ThemeContext);
    
    const[datakey,setDatakey] = useState('state');
    const dessortable = (a, b) =>{
        return parseInt(b["confirmed"]) - parseInt(a["confirmed"]);
      };
    useEffect(()=>{
        let filterArray = [];
        if(stateDistrict.length > 0 && stateData.length > 0){
            if(props.match.params.statecode !=='allstates'){
                filterArray = stateDistrict.filter( (item)=>item.statecode === props.match.params.statecode)[0];
                filterArray = filterArray.districtData.sort(dessortable).slice(0,15);
                setDatakey('district');
               
            }else{
                const length = stateData.length;
                setDatakey('state');
                filterArray = stateData.slice(1,length/2);
            }
            
            setLatestData(filterArray);
        }
    },[stateData,stateDistrict, props.match.params.statecode]);
    return (
        <> 
            <div className={`state-bar-description-graph ${thememode}`}>
                <div className={`state-bar-dropdown-container ${thememode}`}>
                    <h3 className="state-bar-caseheading">Top 15 Regions by Total Cases: </h3>
                    {/* <DropdownComponent type ={"casetype"} selectDropdown = {e=>onSelectDropdown(e)}/>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/> */}
                </div>
                <StackBarGraph latestData= {latestData} 
                    filterCaseType = {filterData.caseType}
                    datakey={datakey}
                />
            </div>
        </>
    );
};

export default withRouter(BarChartComponentState);