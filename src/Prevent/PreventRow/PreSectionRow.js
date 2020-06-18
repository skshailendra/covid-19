import React, { useContext } from "react";
import { ThemeContext } from '../../context/theme';

const PreSectionRow = (props) => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <div className={`img-section ${thememode}`}>
        <span className='icon-sec'>
          <img src={props.imgName} alt='Not Available'/>
        </span>
        <span className='main-content'>{props.content}</span>
      </div>
    </>
  );
}

export default PreSectionRow;
