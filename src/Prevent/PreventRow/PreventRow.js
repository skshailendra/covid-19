import React, { useContext } from "react";
import { ThemeContext } from '../../context/theme';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

export default function PreventRow(props) {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <div className={`img-section ${thememode}`}>
        <span className='icon-sec'>
          <FontAwesomeIcon icon={props.iconName} color={props.color} className="icon"/>
        </span>
        <span className='main-content'>{props.content}</span>
      </div>
    </>
  );
}
