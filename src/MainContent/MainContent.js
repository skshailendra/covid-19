import React, {useRef, useEffect, useState} from 'react';
import Card from '../Layout/Card/Card';
import './MainContent.scss';
import {Line } from 'react-chartjs-2';
import caseTimeSeries from '../data/caseTimeSeries';

import { faHome, faStar, faSync,faStoreAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import RechartComponent from '../GraphComponent/RechartComponent/RechartComponent';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
import DropdownComponent from '../UIComponent/DropdownComponent/DropdownComponent';
const MainContent = props =>{
    
    return (
        <>
            <Overview/>
            <DisplayTotal/>
            <div className="description">
                <div className="description-graph">
                    <div className="dropdown-container">
                        <DropdownComponent type ={"casetype"}/>
                        <DropdownComponent type ={"months"}/>
                    </div>
                    <RechartComponent/>
                   
                </div>
                <div className="user-reviews">
                    <div className="review">
                        <p className="review__text">
                            Hello world how are you fsfas asdfa sfasf afafaf aff af aHello world how are you fsfas asdfa sfasf afafaf aff af a
                        </p>
                        <figcaption className="review__user">
                            <img src="img/corona_2.jpg" alt="User1" className="review__photo"/>
                            <div className="review__user-box">
                                <p className="review__user-name">Shailendra</p>
                                <p className="review__user-date">Feb,23 </p>
                            </div>
                            <div className="review__user-rating">
                                7.8
                            </div>
                        </figcaption>
                    </div>
                    {/* <div className="review">
                        <p className="review__text">
                            Hello world how are you this is shailendrs blog Hello world how are you fsfas asdfa sfasf afafaf aff af aHello world how are you fsfas asdfa sfasf afafaf aff af a
                        </p>
                        <figcaption className="review__user">
                            <img src="img/corona_2.jpg" alt="User1" className="review__photo"/>
                            <div className="review__user-box">
                                <p cla="review__user-name">Shailendra</p>
                                <p cla="review__user-date">Feb,23 </p>
                            </div>
                            <div className="review__user-rating">
                                7.8
                            </div>
                        </figcaption>
                    </div>
                    <div className="review__button">
                        <button className="btn-inline"> Show All <span>&rarr;</span></button>
                    </div> */}
                    
                </div>
            </div>
        </>
    );
};

export default MainContent;