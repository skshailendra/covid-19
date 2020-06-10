import React from 'react';
import { faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import './Loading.scss';
const Loading = props =>{
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faCircleNotch}  color="#c3c3c3"  size="3x"/>
        </div>
    )

};

export default Loading;