import React ,{ useState , useRef, useContext, useEffect}from 'react';

import {FetchDataContext} from '../../context/fetch-data';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSearch,faTimesCircle,faFrown,faFrownOpen, faSadCry,faSadTear } from "@fortawesome/free-solid-svg-icons";
import './SearchComponent.scss';
import {Link,useHistory} from 'react-router-dom';
import { findDOMNode } from 'react-dom';

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
    const searchResult = useRef();
    const history = useHistory();
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
        }
    },[]);
    useEffect(()=>{
        if(fetchCovidData){
          setStateData(fetchCovidData.statewise.slice(1));
          setStateDistrict(fetchCovidData.stateDistrict);
        }
    },[fetchCovidData]);

    useEffect(() => {
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
                    tempDistrictList.push(...filterDistrictList);
                }           
            });
            
            setSearchList([...tempSearchList,...tempDistrictList]);
            }else{
                setSearchList([]);
            }
        },50);
        return()=>{      
            clearTimeout(optimizeSearch);
        }
    },[searchValue]);
    useEffect(()=>{
        // No result Found Case
        if(searchList.length === 0  && searchValue !==''){
            setNoResult(true);
        }
        // When we get the search result
        if(searchList.length !== 0 && searchValue !==''){
            setNoResult(false);
        }
       
    },[searchList]);

    const selectSearchItem = (e)=>{
        console.log(e.target.dataset.statecode);
       
        let statecode = e.target.dataset.statecode ? e.target.dataset.statecode: e.target.parentNode.parentNode.dataset.statecode;
        const findEle = e.target.dataset.statename ? findDOMNode(e.target): findDOMNode(e.target.parentNode.parentNode);
        let statename = findEle.getElementsByClassName("search-result__district-name")[0] ? 
        findEle.getElementsByClassName("search-result__district-name")[0] : 
        findEle.getElementsByClassName("search-result__state-name")[0];
        if (statecode !== undefined ){
            setSearchValue(statename.innerText);
            history.push(`/state/${statecode}`);
        }
    };
    return (
        <>
            <div className="search-wrap">
                <div className="search">
                    <input ref={searchRef} type="text" className="search__input" placeholder="Search state,city" value={searchValue} onChange={e => onChangeHandler(e)} onFocus={e=>onFocusHandler(e)}/>
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
                        <ul className="search-result__list" onClick={selectSearchItem}>
                            {
                            searchList && 
                            searchList.map((search,idx)=>(
                                // <Link key={idx} className="search-result__link" to={`/state/${search.statecode}` }>
                                <li key={idx}  className="search-result__item" data-statecode={search.statecode} data-statename={search.state}>
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
                                // </Link>
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
                                    <span className="search-result__suggestion-text">Try Searching for...</span>
                                    <ul className="search-result__list" onClick={selectSearchItem}>
                                        <li data-statecode={"MH"} data-statename={"Maharashtra"} className="search-result__suggest-item">
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className="search-result__state-name">
                                            Mumbai
                                            </div>
                                        </li>
                                        <li data-statecode={"TN"} data-statename={"Tamil Nadu"} className="search-result__suggest-item">
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className="search-result__state-name">
                                            Tamil Nadu
                                            </div>
                                        </li>
                                        <li data-statecode={"RJ"} data-statename={"Rajasthan"} className="search-result__suggest-item">
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className="search-result__state-name">
                                            Rajasthan
                                            </div>
                                        </li>
                                        <li data-statecode={"UP"} data-statename={"Uttar Pradesh"} className="search-result__suggest-item">
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className="search-result__state-name">
                                            Lucknow
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