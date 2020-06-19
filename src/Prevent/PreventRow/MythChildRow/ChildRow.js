import React, { useContext } from "react";
import { ThemeContext } from '../../../context/theme';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

const ChildRow = (props) => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <div className="sec-content">
        <span className="myth">{props.mythList.myth}</span>
        <span className="icon-content">
          { props.mythList.img ? <img src={props.mythList.img} alt='Not Available'></img> :           
            <FontAwesomeIcon className='icon-size' size="sm" icon={faHandPointRight}/>
          }         
        </span>
        <span className="fact">{props.mythList.fact}</span>
      </div>           
    </>
  );
}

export default ChildRow;