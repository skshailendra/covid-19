
import React, { useEffect, useState,useContext} from 'react';
import {FetchDataContext} from '../../context/fetch-data';
import './TableComponent.scss';
import { faArrowUp,faArrowDown,faChevronDown,faChevronCircleRight, faChevronRight, faChevronCircleDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';

const TableComponent = React.memo(props =>{
    //const {type}  = props;
    const fetchCovidData = useContext(FetchDataContext);
    const [stateData,setStateData] = useState([]);
    const [stateDistrict,setStateDistrict] = useState([]);
    const [sortTable, setSortTable] = useState({asc:true, label:''});
    const [districtSortTable, setDistrictSortTable] = useState({asc:true, label:'',code:null,state:null});
    const heading = [
      {
        label:'Confirmed'
      },
      {
        label:'Active'
      },
      {
        label:'Recovered'
      },
      {
        label:'Deaths'
      }
    ];
    const districtHeading = [
      {
        label:'Confirmed'
      },
      {
        label:'Active'
      },
      {
        label:'Recovered'
      },
      {
        label:'Deceased'
      }
    ];
    useEffect(()=>{
      console.log("table data",fetchCovidData);
      if(fetchCovidData){
        setStateData(fetchCovidData.statewise.slice(1));
        setStateDistrict(fetchCovidData.stateDistrict);
      }
    },[fetchCovidData]);

    useEffect(()=>{
      if(sortTable && sortTable.label){
        const tempArr = [...stateData];
        tempArr.sort(sortable);
        setStateData(tempArr);
      }
    },[sortTable]);
    useEffect(()=>{
      if(districtSortTable.label){
        const tempArr = [...stateData];
        tempArr[districtSortTable.code].districtList.districtData.sort(districtsortable);
        setStateData(tempArr);
      }
    },[districtSortTable]);
    const districtsortable = (a, b) =>{
      return (parseInt(a[districtSortTable.label]) - parseInt(b[districtSortTable.label])) * (districtSortTable.asc ?1 :-1);
    };
    const sortable = (a, b) =>{
      return (parseInt(a[sortTable.label]) - parseInt(b[sortTable.label])) * (sortTable.asc ?1 :-1);
    };
    const sortTableHandler = (e, heading)=>{
      if(sortTable.label.toLowerCase() === heading.label.toLowerCase()){
        setSortTable({...sortTable, asc:!sortTable.asc});
      }else{
        setSortTable({asc:true, label : heading.label.toLowerCase()})
      }
    }
    const districtSortTableHandler = (e, heading,code)=>{
      if(districtSortTable.label.toLowerCase() === heading.label.toLowerCase()){
        setDistrictSortTable({...districtSortTable, asc:!districtSortTable.asc , code:code});
      }else{
        setDistrictSortTable({asc:true, label : heading.label.toLowerCase(), code:code})
      }
    }
    const showDistrict = (e,code,state)=>{
      state.showExpand = !state.showExpand;
      const tempArr = [...stateData];
      const districtList = stateDistrict.filter(stDst=>stDst.statecode === state.statecode);
      state.showExpand ? (tempArr[code].districtList = districtList[0]):delete tempArr[code].districtList;
      setStateData(tempArr);
    }
    return(
        <>
          <div className="table">
            <div className="table__body">
                <div className="table__row-heading">
                  <div className="table__heading">
                    <div className="table__heading-content">State/UT</div>
                  </div>
                  {
                    heading.map((head,key)=>(
                      <div key={key} className="table__heading" onClick={e=>sortTableHandler(e, head)}>
                        <div className="table__heading-content" >{head.label}</div>
                        {head.label.toLowerCase() === sortTable.label.toLowerCase() && 
                        <div className="table__icon-container">
                          { sortTable.asc ? 
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__icon"/>
                          :
                          <FontAwesomeIcon icon={faArrowDown}  size="sm" className="table__icon"/>}
                        </div>
                        }
                      </div>
                    ))
                  }
                </div>
                {
                  stateData && 
                  stateData.map((state,code)=>(
                  <React.Fragment key={code}>
                    <div className="table__row" key={code} onClick={e=>showDistrict(e,code,state)} >
                      <div className="table__column">
                          <div className="table__body-content-delta">
                            {state.showExpand ?
                            <FontAwesomeIcon icon={faChevronCircleDown} size="lg" color="#b8b4e7" className="table__body__icon"/>
                            : <FontAwesomeIcon icon={faChevronCircleRight} size="lg" color="#b8b4e7" className="table__body__icon"/>
                            }
                          </div>
                          <div className="table__body-content">{state.state}</div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__confirmed">
                          <div className="table__body-content">{state.confirmed}</div>
                          <div className="table__body-content-delta">
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__body__icon"/>{state.deltaconfirmed}
                          </div>
                        </div>         
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__recovered">
                          <div className="table__body-content">{state.recovered}</div>
                          <div className="table__body-content-delta">
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__body__icon"/>
                          {state.deltarecovered}</div>
                        </div> 
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__active">
                          <div className="table__body-content">{state.active}</div>
                        </div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats table__data__deceased">
                          <div className="table__body-content">{state.deaths}</div>
                          <div className="table__body-content-delta">
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__body__icon"/>{state.deltadeaths}</div>
                        </div> 
                      </div>
                      {/* <div className="table__column check">                        
                        <div className="table__body-content" onClick={e=>showDistrict(e,code,state)}>
                          <button className="btn-inline2"> Details<span>&rarr;</span></button>
                        </div>
                      </div>*/}
                    </div>
                    {state.showExpand && 
                      <div className="table__row-heading table__row-heading-district">
                      <div className="table__heading">
                        <div className="table__heading-content">District</div>
                      </div>
                      {
                        districtHeading.map((head,key)=>(
                          <div key={key} className="table__heading" onClick={e=>districtSortTableHandler(e, head, code)}>
                            <div className="table__heading-content" >{head.label}</div>
                            {head.label.toLowerCase() === districtSortTable.label.toLowerCase() && 
                            <div className="table__icon-container">
                              { districtSortTable.asc ? 
                              <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__icon"/>
                              :
                              <FontAwesomeIcon icon={faArrowDown}  size="sm" className="table__icon"/>}
                            </div>
                            }
                          </div>
                        ))
                      }
                     
                      {/* <div className="table__heading">
                        <div className="table__heading-content"></div>
                        <div className="table__icon-container">
                          Details
                        </div>
                      </div> */}
                    </div>
                    }

                    {
                      state.districtList  && 
                      state.districtList.districtData.map((district,index)=>(
                        <div className="table__row table__row-district" key={index}>
                          <div className="table__column">
                            <div className="table__body-content">{district.district}</div>
                          </div>
                          <div className="table__column">
                            <div className="table__data__stats table__data__confirmed">
                              <div className="table__body-content">{district.confirmed}</div>
                            </div>         
                          </div>
                          <div className="table__column">
                            <div className="table__data__stats table__data__recovered">
                              <div className="table__body-content">{district.recovered}</div>
                            </div> 
                          </div>
                          <div className="table__column">
                            <div className="table__data__stats table__data__active">
                              <div className="table__body-content">{district.active}</div>
                            </div>
                          </div>
                          <div className="table__column">
                            <div className="table__data__stats table__data__deceased">
                              <div className="table__body-content">{district.deceased}</div>
                          </div>
                          {/* <div className="table__column check">                        
                            <div className="table__body-content">
                              <button > Show All<span>&rarr;</span></button>
                            </div>
                          </div>                       */}
                          </div>
                        </div>
                      ))
                      }

                    </React.Fragment >
                  ))

                }
              </div>
          </div>
        </>
    )
});

export default TableComponent;