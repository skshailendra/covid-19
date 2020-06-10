import React from 'react';

import {FetchDataContext} from '../../context/fetch-data';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faSearch,faTimesCircle,faFrown,faFrownOpen, faSadCry,faSadTear } from "@fortawesome/free-solid-svg-icons";
import './LoadingSearch.scss';

const LoadingSearch = props =>{
    
    return (
        <div className="search-wrap">
            <div className="search">
                <input type="text" className="search__input" placeholder="Search state,city" />
                <button className="search__button">
                    <FontAwesomeIcon icon={faSearch}  color="#a29a9ad4" size="1x" className="search__icon"/>
                </button>
            </div>
        </div>
    )
};

export default LoadingSearch;