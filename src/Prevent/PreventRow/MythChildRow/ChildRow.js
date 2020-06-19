import React, { useContext } from "react";
import { ThemeContext } from '../../../context/theme';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const ChildRow = (props) => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <div className="sec-content">
        <span className="myth">{props.mythList.myth}</span>
        <span className="icon-content"><FontAwesomeIcon className='icon-size' icon={faCheck}/></span>
        <span className="fact">{props.mythList.fact}</span>
      </div>           
    </>
  );
}

export default ChildRow;