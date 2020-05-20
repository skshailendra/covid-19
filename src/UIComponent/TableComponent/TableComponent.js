
import React, { useEffect, useState,useContext} from 'react';
import {FetchDataContext} from '../../context/fetch-data';
import './TableComponent.scss';
import { faArrowUp,faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';

const TableComponent = React.memo(props =>{
    //const {type}  = props;
    const fetchCovidData = useContext(FetchDataContext);
    const [stateData,setStateData] = useState([]);
    useEffect(()=>{
      console.log("table data",fetchCovidData);
      if(fetchCovidData){
        setStateData(fetchCovidData.statewise.slice(1));
      }
    },[fetchCovidData]);

    const showDistrict = (e,code,state)=>{
      console.log("called..",e,code,state);
      state.showExpand = !state.showExpand;
      const tempArr = [...stateData];
      state.showExpand? tempArr.splice(code,0,state):tempArr.splice(code,1);
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
                  <div className="table__heading">
                    <div className="table__heading-content">Confirmed</div>
                    <div className="table__icon-container">
                      <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__icon"/>
                      {/* <FontAwesomeIcon icon={faArrowDown}  size="sm" className="table__icon"/> */}
                    </div>
                   
                  </div>
                  <div className="table__heading">
                    <div className="table__heading-content">Recovered</div>
                  </div>
                  <div className="table__heading">
                    <div className="table__heading-content">Active</div>
                  </div>
                  <div className="table__heading">
                    <div className="table__heading-content">Deceased</div>
                  </div>
                  <div className="table__heading">
                    <div className="table__heading-content"></div>
                    <div className="table__icon-container">
                      Details
                      {/* <FontAwesomeIcon icon={faArrowDown}  size="sm" className="table__icon"/> */}
                    </div>
                  </div>
                </div>
                {
                  stateData && 
                  stateData.map((state,code)=>(<>
                    <div className="table__row" key={code}>
                      <div className="table__column">
                        <div className="table__body-content">{state.state}</div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats">
                          <div className="table__body-content">{state.confirmed}</div>
                          <div className="table__body-content-delta">
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__body__icon"/>{state.deltaconfirmed}
                          </div>
                        </div>         
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats">
                          <div className="table__body-content">{state.recovered}</div>
                          <div className="table__body-content-delta">
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__body__icon"/>
                          {state.deltarecovered}</div>
                        </div> 
                      </div>
                      <div className="table__column">
                        <div className="table__body-content">{state.active}</div>
                      </div>
                      <div className="table__column">
                        <div className="table__data__stats">
                          <div className="table__body-content">{state.deaths}</div>
                          <div className="table__body-content-delta">
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__body__icon"/>{state.deltadeaths}</div>
                        </div> 
                      </div>
                      <div className="table__column check">                        
                        <div className="table__body-content" onClick={e=>showDistrict(e,code,state)}>
                          <button className="btn-inline2"> Details<span>&rarr;</span></button>
                        </div>
                      </div>                      
                    </div>
                    {state.showExpand && 
                      <div className="table__row-heading">
                      <div className="table__heading">
                        <div className="table__heading-content">State/UT</div>
                      </div>
                      <div className="table__heading">
                        <div className="table__heading-content">Confirmed</div>
                        <div className="table__icon-container">
                          <FontAwesomeIcon icon={faArrowUp}  size="sm" className="table__icon"/>
                          {/* <FontAwesomeIcon icon={faArrowDown}  size="sm" className="table__icon"/> */}
                        </div>
                       
                      </div>
                      <div className="table__heading">
                        <div className="table__heading-content">Recovered</div>
                      </div>
                      <div className="table__heading">
                        <div className="table__heading-content">Active</div>
                      </div>
                      <div className="table__heading">
                        <div className="table__heading-content">Deceased</div>
                      </div>
                      <div className="table__heading">
                        <div className="table__heading-content"></div>
                        <div className="table__icon-container">
                          Details
                          {/* <FontAwesomeIcon icon={faArrowDown}  size="sm" className="table__icon"/> */}
                        </div>
                      </div>
                    </div>
                    }
                    </>
                  ))

                }
                <div className="table__row">
                  <div className="table__column">
                    <div className="table__body-content">UP</div>
                  </div>
                  <div className="table__column">
                    <div className="table__body-content">19424</div>
                  </div>
                  <div className="table__column">
                    <div className="table__body-content">344</div>
                  </div>
                  <div className="table__column">
                    <div className="table__body-content">2344</div>
                  </div>
                  <div className="table__column">
                  <div className="table__body-content">23</div>
                  </div>
                  <div className="table__column check">
                    <div></div>
                    <div className="button">
                    <button className="btn-inline2"> Show All <span>&rarr;</span></button>
                      </div>
                  </div>
                </div>
               
                
                {/* <div className="table__row">
                  <div className="table__column">
                    <div className="table__body-content">UP</div>
                  </div>
                  <div className="table__column">
                    <div className="table__body-content">19424</div>
                  </div>
                  <div className="table__column">
                    <div className="table__body-content">344</div>
                  </div>
                  <div className="table__column">
                    <div className="table__body-content">2344</div>
                  </div>
                  <div className="table__column">
                  <div className="table__body-content">23</div>
                  </div>
                  <div className="table__column">
                    <div className="table__body-content">See Details</div>
                  </div>
                </div> */}
              </div>
          </div>
        </>
    )
});

export default TableComponent;