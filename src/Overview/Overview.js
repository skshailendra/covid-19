import React from 'react';
import './Overview.scss';
import { faSlash,faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import useDatetime from '../hooks/datetime';
import {withRouter, Link} from 'react-router-dom';

const Overview = props =>{
    const {lastupdatedTime} = useDatetime();
    console.log(props);
    const statename = props.match && props.match.params.statecode === 'allstates'? 'All States' : null;
    return (
        <div className="overview">
            <div className="overview__location">
                <Link to='/' className="overview__heading">  
                    <h3>
                        India
                    </h3>
                </Link>
                {/* <div className="overview__location-save">
                    <FontAwesomeIcon icon={faStar}  color="#f5dbda" className="overview__icon"/>
                    <span className="overview__save-text">Save Location</span>
                </div> */}
                { statename &&
                    <div className="overview__location-save">
                        <FontAwesomeIcon icon={faSlash}  color="#f5dbda" />
                        <span className="overview__save-text">{statename}</span>
                    </div>
                }
            </div>
            <div className="overview__refresh">
                <FontAwesomeIcon icon={faSync}  color="grey" className="overview__icon"/>
                <span className="overview__last-update">Last updated about {lastupdatedTime} ago</span>
            </div>
        </div>
    )
};

export default  React.memo(withRouter(Overview));