import React, { useContext } from "react";
import { ThemeContext } from '../../context/theme';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const MythRow = (props) => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <div className='content-border'>
        <div className='myth-header'><span>MYTH BUSTERS COVID-19</span></div>
        <div className='sign'>       
          <FontAwesomeIcon className='icon-size' icon={faTimes} color='red'/>
          <FontAwesomeIcon className='icon-size' icon={faCheck} color='green'/>
        </div>
        <div className='sec-content'>
          <span>sajhg</span>
          <span className='icon-content'><FontAwesomeIcon className='icon-size' icon={faCheck}/></span>
          <span>hsdghj</span>
        </div>           
      </div>
    </>
  );
}

export default MythRow;
