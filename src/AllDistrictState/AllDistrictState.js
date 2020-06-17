import React,{useState,useEffect, useContext} from 'react';
import './AllDistrictState.scss';
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import {withRouter} from 'react-router-dom';
import {FetchDataContext} from '../context/fetch-data';
import DropdownComponent from '../UIComponent/DropdownComponent/DropdownComponent';
import TinyBarGraph from '../GraphComponent/TinyBarGraph/TinyBarGraph';
import {ThemeContext} from '../context/theme';
const AllDistrictState = props =>{
    const [filterData, setFilterData ] = useState({caseType:'all',statecode:'' });

    const fetchCovidData = useContext(FetchDataContext); 
    
    const [stateList,setStateList] = useState([]);
    const [latestData, setLatestData] = useState([]);
   // const statecode = props.match && props.match.params.statecode === 'allstates'? 'All States' : props.match.params.statecode;
    const {thememode} = useContext(ThemeContext);
    const dataKey = {
        confirmed: "confirmed",
        recovered: "recovered",
        deceased : "deceased",
        active: "active"
    };
    const  casesType= [
        {
          type:"Confirmed",
          value:"Confirmed"
        },
        {
            type:"Active",
            value:"Active"
        },
        {
          type:"Recovered",
          value:"Recovered"
        },
        {
          type:"Deceased",
          value:"Deceased"
        }
    ];
    const onSelectDropdown = (value)=>{
        if(value && value.type === "states"){
            value.selectedtype = value.selectedtype === 'All' ? '' : value.selectedtype;
            setFilterData({...filterData,statecode:value.selectedtype})
        }else{
            setFilterData({...filterData,caseType:value.selectedtype})
        }
    }
    const onChangeState = (value)=>{
        if(value && value.type === "states"){
            props.history.push(`/state/${value.selectedtype}`);
        }else{
            setFilterData({...filterData,caseType:value.selectedtype});
        }
    }
    const sortable = (a, b) =>{
        return parseInt(b[filterData.caseType.toLowerCase()]) - parseInt(a[filterData.caseType.toLowerCase()]);
    };
    const createFilterArray = ()=>{
        if(fetchCovidData.stateDistrict.length > 0 && filterData.statecode){
            let filterArray = fetchCovidData.stateDistrict.slice(1).filter( (item)=>item.statecode === filterData.statecode)[0];
            filterArray.districtData = filterArray.districtData.sort(sortable);            
            setLatestData({...filterArray,filterArray});
        }
    }

    const getAllStates = () =>{
        let states = [];
        fetchCovidData.stateDistrict.slice(1).map((state)=>{
          states.push({
            type:state.statecode,
            value:state.state
          });
        });
       
        setStateList(states);
    }
    useEffect(()=>{
    if(fetchCovidData && 
        fetchCovidData.statewise.length > 0 && 
        fetchCovidData.stateDistrict.length > 0){
        getAllStates();
    }
    },[fetchCovidData]);
    useEffect(()=>{
        createFilterArray();
    },[fetchCovidData,filterData]);
    useEffect(()=>{
        if(props.match.params.statecode !== 'allstates'){
            setFilterData({...filterData,statecode:props.match.params.statecode});
        }
    },[props.match.params.statecode]);
    return (
        <> 
            <div className={`all-states-graph ${thememode}`}>
                <div className={`all-states-dropdown-container ${thememode}`}>
                    <h3 className="all-states-graph__caseheading">Statewise Data: </h3>
                    {stateList.length > 0 && props.match.params.statecode ===  'allstates' && 
                    <DropdownComponent type ={"states"} list = {stateList} selectDropdown = {e=>onSelectDropdown(e)}/>
                    }
                    {stateList.length > 0 && props.match.params.statecode !==  'allstates' && 
                    <DropdownComponent type ={"states"} list = {stateList} selectDropdown = {e=>onChangeState(e)} params={props.match.params.statecode}/>
                    }
                    <DropdownComponent type ={"custom"} list = {casesType} selectDropdown = {e=>onSelectDropdown(e)}/>
                   
                </div>
                {  latestData && latestData.districtData && 
                <>
                <div className={`all-district ${thememode}`}>
                        <div className="all-district-bargraph">
                            <TinyBarGraph latestData= {latestData.districtData.slice(0,5)} filterCaseType = {filterData.caseType} dataKey={dataKey} xDataKey={"district"}/>
                            <div className="all-district__topdata-label">
                                <p>Top 5 Effected District</p>
                            </div>
                        </div>
                        <div className="all-district__all-list">
                            <div className="all-district__all-list-label">
                                <p>All District List:</p>
                            </div>
                            <ul className="all-district__list">                            
                                {latestData.districtData.map((state,idx)=>(
                                <li key={idx} className="all-district__list-items"> 
                                    <div className="all-district__name">{state.district}</div>
                                    {filterData.caseType.toLowerCase() === "confirmed" &&
                                    <div className={`all-district__count ${filterData.caseType.toLowerCase()}`}>{state.confirmed}</div>
                                    }
                                    {filterData.caseType.toLowerCase() === "active" &&
                                        <div className={`all-district__count ${filterData.caseType.toLowerCase()}`}>{state.active}</div>
                                    }
                                    {filterData.caseType.toLowerCase() === "recovered" &&
                                        <div className={`all-district__count ${filterData.caseType.toLowerCase()}`}>{state.recovered}</div>
                                    }
                                    {filterData.caseType.toLowerCase() === "deceased" &&
                                        <div className={`all-district__count ${filterData.caseType.toLowerCase()}`}>{state.deceased}</div>
                                    }
                                    {state.delta && 
                                    <>
                                        <FontAwesomeIcon icon={faArrowUp}  size="lg" className={`all-district__icon ${filterData.caseType.toLowerCase()}`}/>

                                        <div className={`all-district__delta ${filterData.caseType.toLowerCase()}`}>{state.delta.confirmed}</div>
                                    </>
                                    }


                                </li>
                                ))
                                }
                            </ul> 
                        </div>
                                               
                </div>
               
                </>
               }
            </div>
         </>
    )
};

export default  React.memo(withRouter(AllDistrictState));