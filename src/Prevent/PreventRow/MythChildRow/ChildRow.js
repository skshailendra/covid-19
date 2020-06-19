import React, { useContext } from "react";
import { ThemeContext } from '../../context/theme';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const ChildRow = (props) => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <div className='sec-content'>
        <span>sajhg</span>
        <span className='icon-content'><FontAwesomeIcon className='icon-size' icon={faCheck}/></span>
        <span>hsdghj</span>
      </div>           
    </>
  );
}

export default ChildRow;