import React ,{ useState }from 'react';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSearch,faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './SearchComponent.scss';

const SearchComponent = props =>{
    const [searchFocus, setSearchFocus] = useState(false);
    const onChangeHandler = (event) =>{
        if(event && event.target.value){
            setSearchFocus(true);
        }else{
            setSearchFocus(false);
        }
        
    };
    return (
        <>
            <div className="search-wrap">
                <div className="search">
                    <input type="text" className="search__input" placeholder="Search Location" onChange={((event)=>{
                        onChangeHandler(event,true)
                    })}/>
                    <button className="search__button">
                        {   !searchFocus &&
                                <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="sm" className="search__icon"/>
                        }
                        {   searchFocus &&
                            <FontAwesomeIcon icon={faTimesCircle}  color="#a29a9ad4" size="sm" className="search__icon"/>
                        }
                        
                    </button>
                    {/* <button className="search__button">
                        <FontAwesomeIcon icon={faTimesCircle}  color="#a29a9ad4" className="search__icon"/>
                    </button> */}
                </div>
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
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default SearchComponent;