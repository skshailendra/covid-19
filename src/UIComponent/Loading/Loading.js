import React ,{useContext}from 'react';
import { faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import './Loading.scss';
import {ThemeContext} from '../../context/theme';
const Loading = props =>{
    const {thememode} = useContext(ThemeContext);
    return (
        <div className={`loading ${thememode}`}>
            <FontAwesomeIcon icon={faCircleNotch}  color="#c3c3c3"  size="3x"/>
        </div>
    )

};

export default Loading;