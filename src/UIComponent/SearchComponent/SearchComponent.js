import React ,{ useState , useRef, useReducer}from 'react';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSearch,faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './SearchComponent.scss';

const SearchComponent = props =>{
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchValue, setSearchValue] = useState('');
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
                            <li className="search-result__item">
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

                            </li>
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </>
    )
};

export default SearchComponent;