import React ,{ useState , useRef, useContext, useEffect}from 'react';

import {FetchDataContext} from '../../context/fetch-data';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSearch,faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './SearchComponent.scss';

const SearchComponent = props =>{
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const fetchCovidData = useContext(FetchDataContext);
    const [stateData,setStateData] = useState([]);
    const [stateDistrict,setStateDistrict] = useState([]);
    const [searchList, setSearchList] = useState([]);
    let tempSearchList = [], tempDistrictList= [];
    const searchRef= useRef();
    const onChangeHandler = (event) =>{
        setSearchValue(searchRef.current.value);
        if(event && event.target.value){
            setSearchFocus(true);
        }else{
            setSearchFocus(false);
        }
        
    };
    const onClearSearch = (e)=>{
        setSearchFocus(false);
        setSearchValue('');
    }

    useEffect(()=>{
        if(fetchCovidData){
          setStateData(fetchCovidData.statewise.slice(1));
          setStateDistrict(fetchCovidData.stateDistrict);
        }
    },[fetchCovidData]);

    useEffect(() => {
        console.log("search value..",searchRef.current.value);
        
        
        const filterStateData = stateData.filter( (data)=>{
            return data.state.toLowerCase().includes((searchRef.current.value.toLowerCase()))
        });
        //tempSearchList = [...searchList]; // Destructure array list
        tempSearchList.push(...filterStateData);
       //setSearchList(tempSearchList);

        // Searching in District List
        stateDistrict.forEach( (data)=>{
            const filterDistrictList = data.districtData.filter((dist)=>{
                return dist.district.toLowerCase().includes((searchRef.current.value.toLowerCase()))
            });
            if(filterDistrictList.length > 0){
                filterDistrictList.map((filDist)=>{
                    filDist.isDistrict = true;
                    filDist.state = data.state;
                    filDist.statecode = data.statecode;
                })
                console.log("-------",filterDistrictList)
                tempDistrictList.push(...filterDistrictList);
            }           
        });
        
        setSearchList([...tempSearchList,...tempDistrictList]);
       
    },[searchValue]);
    useEffect(()=>{
        console.log(searchList);
    },[searchList])
    return (
        <>
            <div className="search-wrap">
                <div className="search">
                    <input ref={searchRef} type="text" className="search__input" placeholder="Search Location" value={searchValue} onChange={e => onChangeHandler(e)}/>
                    <button className="search__button">
                        {   !searchFocus &&
                                <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                        }
                        {   searchFocus &&
                            <FontAwesomeIcon icon={faTimesCircle}  onClick={e=>onClearSearch(e)}color="#a29a9ad4" size="lg" className="search__icon"/>
                        }
                        
                    </button>
                    {searchFocus &&
                    <div className="search-result">
                        <ul className="search-result__list">
                            {
                            searchList && 
                            searchList.map((search,idx)=>(
                                <li key={idx} className="search-result__item">
                                    {search.isDistrict && 
                                    <>
                                    <div className="search-result__name">
                                        <span className="search-result__district-name">
                                        {search.district}
                                        </span>
                                        <span className="search-result__dist-state-name">
                                            {search.state} 
                                        </span>
                                    </div>
                                    <div className="search-result__count">
                                        <span className="search-result__status-text">
                                            Confirmed
                                        </span>
                                        <span className="search-result__status-count">
                                            {search.confirmed}
                                        </span>
                                        
                                    </div>
                                    </>
                                    }
                                    {!search.isDistrict && 
                                    <>
                                    <div className="search-result__state-name">
                                        {search.state}
                                    </div>
                                    <div className="search-result__count">
                                        <span className="search-result__status-text">
                                            Confirmed
                                        </span>
                                        <span className="search-result__status-count">
                                            {search.confirmed}
                                        </span>
                                        
                                    </div>
                                    </>
                                    }
                                    
                                </li>
                            ))
                            }
                            {/* <li className="search-result__item">
                                <div className="search-result__name">
                                    Maharastra
                                </div>
                                <div className="search-result__count">
                                    23455
                                </div>
                            </li>
                            <li className="search-result__item">
                                <div className="search-result__name">
                                    Up
                                </div>
                                <div className="search-result__count">
                                    23455
                                </div>
                            </li>
                            <li className="search-result__item">
                                <div className="search-result__name">
                                    MP
                                </div>
                                <div className="search-result__count">
                                    23455
                                </div>
                                <figure className="review__button">
                                  <button className="btn-inline"> Show All <span>&rarr;</span></button>
                                </figure>

                            </li> */}
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </>
    )
};

export default SearchComponent;