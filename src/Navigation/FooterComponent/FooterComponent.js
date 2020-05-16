import React, { useState } from 'react';
import './FooterComponent.scss';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
const FooterComponent = props=>{
    return (
        <> 
           <div className="footer">
                <div className="footer__icon-box">
                    <p className="footer__info">
                        {/*Create with care
                         <FontAwesomeIcon icon={faHeart}  size="sm" color="#e83333a8" className="footer__icon"/> */}
                        Open Source
                    </p>
                </div>
                {/* <button className="btn">
                    <span className="btn__visible">Covid Info </span>
                    <span className="btn__invisible">Open Source </span>
                </button> */}
           </div>
        </>
    )
};

export default FooterComponent;