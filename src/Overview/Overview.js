import React from 'react';
import './Overview.scss';
import { faHome, faStar, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import useDatetime from '../hooks/datetime';

const Overview = props =>{
    const {lastupdatedTime} = useDatetime();
    return (
        <div className="overview">
            <div className="overview__location">
                <h3 className="overview__heading">
                    India
                </h3>
                {/* <div className="overview__location-save">
                    <FontAwesomeIcon icon={faStar}  color="#f5dbda" className="overview__icon"/>
                    <span className="overview__save-text">Save Location</span>
                </div> */}
            </div>
            <div className="overview__refresh">
                <FontAwesomeIcon icon={faSync}  color="grey" className="overview__icon"/>
                <span className="overview__last-update">Last updated about {lastupdatedTime} ago</span>
            </div>
        </div>
    )
};

export default Overview;