import React from 'react';
import { faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import './Loading.scss';
const Loading = props =>{
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faCircleNotch}  color="#a29a9ad4" size="3x"/>
        </div>
    )

};

export default Loading;