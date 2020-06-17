import React ,{ useState , useRef, useContext, useEffect}from 'react';

import {FetchDataContext} from '../../context/fetch-data';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSearch,faTimesCircle,faSadTear } from "@fortawesome/free-solid-svg-icons";
import './SearchComponent.scss';
import {useHistory} from 'react-router-dom';
import {ThemeContext} from '../../context/theme';
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
    const history = useHistory();
    const {thememode} = useContext(ThemeContext);
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
            }).slice(0,7); 
            tempSearchList.push(...filterStateData);
            //setSearchList([...tempSearchList]);
            
            // Searching in District List
            stateDistrict.forEach( (data)=>{
                const filterDistrictList = data.districtData.filter((dist)=>{
                    return dist.district.toLowerCase().includes((searchRef.current.value.toLowerCase()))
                }).slice(0,6);
                if(filterDistrictList.length > 0){
                    filterDistrictList.map((filDist)=>{
                        filDist.isDistrict = true;
                        filDist.state = data.state;
                        filDist.statecode = data.statecode;
                    })
                    tempDistrictList.push(...filterDistrictList);
                }           
            });
           
            setSearchList([...tempSearchList,...tempDistrictList].slice(0,7));
                     
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

    const selectSearchItem = (e,state)=>{
        const innerText = state.isDistrict ?  state.district: state.state ;   
        if (innerText !== undefined ){
            setSearchValue(innerText);
            history.push(`/state/${state.statecode}`);
        }
    };
    return (
        <>
            <div className="search-wrap">
                <div className="search">
                    <input ref={searchRef} type="text" className={`search__input ${thememode}`} placeholder="Search state,city" value={searchValue} onChange={e => onChangeHandler(e)} onFocus={e=>onFocusHandler(e)}/>
                    <button className={`search__button ${thememode}`}>
                        {   !searchFocus &&
                                <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                        }
                        {   searchFocus &&
                            <FontAwesomeIcon icon={faTimesCircle}  onClick={e=>onClearSearch(e)}color="#a29a9ad4" size="lg" className="search__icon"/>
                        }
                        
                    </button>
                    {searchFocus &&
                    <div className={`search-result ${thememode}`}>
                        <ul className={`search-result__list ${thememode}`}>
                            {
                            searchList && 
                            searchList.map((search,idx)=>(
                                // <Link key={idx} className="search-result__link" to={`/state/${search.statecode}` }>
                                <li key={idx}  onClick={e=>selectSearchItem(e,search)} className={`search-result__item ${thememode}`} data-statecode={search.statecode} data-statename={search.state}>
                                    {search.isDistrict && 
                                    <>
                                    <div className="search-result__search-detail-icon">
                                        <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                    </div>
                                    <div className="search-result__name">
                                        <span className={`search-result__district-name ${thememode}`}>
                                        {search.district}
                                        </span>
                                        <span className={`search-result__dist-state-name ${thememode}`}>
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
                                    <div className={`search-result__state-name ${thememode}`}>
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
                                <div className={`search-result__noresult ${thememode}`}>
                                    <FontAwesomeIcon icon={faSadTear}  onClick={e=>onClearSearch(e)}color="#e2e2e2" size="2x" className="search__icon"/>
                                    <span>No result Found</span>
                                </div>
                            }
                            {
                                (searchList.length === 0 && !searchValue)
                                && 
                                <div className="search-result__suggestion">
                                    <span className={`search-result__suggestion-text ${thememode}`}>Try Searching for...</span>
                                    <ul className="search-result__list">
                                        <li onClick={e=>selectSearchItem(e,{state: "Maharashtra",
                                            statecode: "MH"})} data-statecode={"MH"} data-statename={"Maharashtra"} className={`search-result__suggest-item ${thememode}`}>
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className={`search-result__state-name ${thememode}`}>
                                            Mumbai
                                            </div>
                                        </li>
                                        <li onClick={e=>selectSearchItem(e,{state: "Tamil Nadu",
                                            statecode: "TN"})} data-statecode={"TN"} data-statename={"Tamil Nadu"} className={`search-result__suggest-item ${thememode}`}>
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className={`search-result__state-name ${thememode}`}>
                                            Tamil Nadu
                                            </div>
                                        </li>
                                        <li onClick={e=>selectSearchItem(e,{state: "Rajasthan",
                                            statecode: "RJ"})} data-statecode={"RJ"} data-statename={"Rajasthan"} className={`search-result__suggest-item ${thememode}`}>
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className={`search-result__state-name ${thememode}`}>
                                            Rajasthan
                                            </div>
                                        </li>
                                        <li onClick={e=>selectSearchItem(e,{state: "Uttar Pradesh",
                                            statecode: "UP", isDistrict: true,district: "Lucknow"})} data-statecode={"UP"} data-statename={"Uttar Pradesh"} className={`search-result__suggest-item ${thememode}`}>
                                            <div className="search-result__search-detail-icon">
                                            <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                                            </div>
                                            <div className={`search-result__state-name ${thememode}`}>
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