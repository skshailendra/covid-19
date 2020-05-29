import React ,{ useState , useRef, useContext, useEffect}from 'react';

import {FetchDataContext} from '../../context/fetch-data';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSearch,faTimesCircle,faFrown,faFrownOpen, faSadCry,faSadTear } from "@fortawesome/free-solid-svg-icons";
import './SearchComponent.scss';

const SearchComponent = props =>{
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const fetchCovidData = useContext(FetchDataContext);
    const [stateData,setStateData] = useState([]);
    const [stateDistrict,setStateDistrict] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [noResult, setNoResult] = useState(false);
    let tempSearchList = [], tempDistrictList= [];
    const searchRef= useRef();
    const onChangeHandler = (event) =>{
        setSearchValue(searchRef.current.value);
        if(searchRef.current.value === ''){
            setNoResult(false);
        }
    };

    const onFocusHandler = (e)=>{
        setSearchFocus(true);
    }

    const clickOutside = (e)=>{
        console.log("outside ",e);
        if(searchRef.current && !searchRef.current.contains(e.target)){
            setSearchFocus(false);
        }
    }
    const onClearSearch = (e)=>{
        setSearchFocus(false);
        setSearchValue('');
        setNoResult(false);
    }

    useEffect(()=>{
        window.addEventListener("click",clickOutside);
        return ()=>{
            window.removeEventListener("click",clickOutside);
            //console.log("clean up ");
        }
    },[]);
    useEffect(()=>{
        if(fetchCovidData){
          setStateData(fetchCovidData.statewise.slice(1));
          setStateDistrict(fetchCovidData.stateDistrict);
        }
    },[fetchCovidData]);

    useEffect(() => {
        //console.log("search value..",searchRef.current.value);
        
        const optimizeSearch = setTimeout(()=>{
            if(searchRef.current.value !== ''){
            const filterStateData = stateData.filter( (data)=>{
                return data.state.toLowerCase().includes((searchRef.current.value.toLowerCase()))
            });
            tempSearchList.push(...filterStateData);
            setSearchList([...tempSearchList]);
            
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
                    //console.log("-------",filterDistrictList)
                    tempDistrictList.push(...filterDistrictList);
                }           
            });
            
            setSearchList([...tempSearchList,...tempDistrictList]);
            }else{
                setSearchList([]);
            }
        },50);
        return()=>{
            console.log("Clear old timeout");       
            clearTimeout(optimizeSearch);
        }
    },[searchValue]);
    useEffect(()=>{
        console.log("called..");
        // No result Found Case
        if(searchList.length === 0  && searchValue !==''){
            setNoResult(true);
        }
        // When we get the search result
        if(searchList.length !== 0 && searchValue !==''){
            setNoResult(false);
        }
       
    },[searchList])
    return (
        <>
            <div className="search-wrap">
                <div className="search">
                    <input ref={searchRef} type="text" className="search__input" placeholder="Search Location" value={searchValue} onChange={e => onChangeHandler(e)} onFocus={e=>onFocusHandler(e)}/>
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
                                    <div className="search-result__search-detail-icon">
                                        <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                    </div>
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
                                    <div className="search-result__search-detail-icon">
                                        <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="sm" className="search__icon"/>
                                    </div>
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
                            {
                                noResult && 
                                <div className="search-result__noresult">
                                    <FontAwesomeIcon icon={faSadTear}  onClick={e=>onClearSearch(e)}color="#e2e2e2" size="2x" className="search__icon"/>
                                    <span>No result Found</span>
                                </div>
                            }
                            {
                                (searchList.length === 0 && !searchValue)
                                && 
                                <div className="search-result__suggestion">
                                    <span className="search-result__suggestion-text">Try Searching for</span>
                                    <ul className="search-result__list">
                                        <li className="search-result__item">
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className="search-result__state-name">
                                            Mumbai
                                            </div>
                                        </li>
                                        <li className="search-result__item">
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className="search-result__state-name">
                                            Tamil Nadu
                                            </div>
                                        </li>
                                        <li className="search-result__item">
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className="search-result__state-name">
                                            Delhi
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </>
    )
};

export default SearchComponent;