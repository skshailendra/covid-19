import React,{useState,useEffect, useContext} from 'react';
import './AllDistrictState.scss';
import { faSlash,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import useDatetime from '../hooks/datetime';
import {withRouter, Link} from 'react-router-dom';
import {FetchDataContext} from '../context/fetch-data';
import DropdownComponent from '../UIComponent/DropdownComponent/DropdownComponent';
const AllDistrictState = props =>{
    console.log(props);
    const [filterData, setFilterData ] = useState({caseType:'all',statecode:'' });

    const fetchCovidData = useContext(FetchDataContext); 
    const [stateData,setStateData] = useState([]);
    const [stateDistrict,setStateDistrict] = useState([]);
    const [stateList,setStateList] = useState([]);
    const [latestData, setLatestData] = useState([]);
    const statecode = props.match && props.match.params.statecode === 'allstates'? 'All States' : props.match.params.statecode;
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
        debugger;
    }
    const createFilterArray = ()=>{
        if(fetchCovidData.stateDistrict.length > 0){
         
            let filterArray = fetchCovidData.stateDistrict.slice(1).filter( (item)=>item.statecode === filterData.statecode)[0];
            console.log(filterArray);
            // filterArray.map((item) => {
            //     item.dailyconfirmed = parseInt(item.dailyconfirmed);
            //     item.dailydeceased = parseInt(item.dailydeceased);
            //     item.dailyrecovered = parseInt(item.dailyrecovered);
            //     item.totalconfirmed = parseInt(item.totalconfirmed);
            //     item.totalconfirmed = parseInt(item.totaldeceased);
            //     item.totalconfirmed = parseInt(item.totalrecovered);
            // });
            setLatestData(filterArray);
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
    // useEffect(()=>{
    //     if(fetchCovidData && 
    //         fetchCovidData.statewise.length > 0 && 
    //         fetchCovidData.stateDistrict.length > 0){
    //       setStateData(fetchCovidData.statewise.slice(1));
    //       setStateDistrict(fetchCovidData.stateDistrict);
    //     }
    // },[fetchCovidData]);
    return (
        <> 
            <div className="all-states-graph">
                <div className="all-states-dropdown-container">
                    <h3 className="all-states-graph__caseheading">Statewise Data: </h3>
                    <DropdownComponent type ={"custom"} list = {casesType} selectDropdown = {e=>onSelectDropdown(e)}/>
                    {/* <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/> */}
                    {stateList.length > 0 &&
                    <DropdownComponent type ={"states"} list = {stateList} selectDropdown = {e=>onSelectDropdown(e)}/>
                    }
                </div>
                {  latestData && latestData.districtData && 
                <div className="all-district">
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
               }
            </div>
         </>
    )
};

export default  React.memo(withRouter(AllDistrictState));