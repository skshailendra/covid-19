import React, { useContext } from "react";
import { ThemeContext } from '../context/theme';
import './Prevent.scss';
import Overview from "../Overview/Overview";

const Prevent = () => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <Overview/>
      <div className='prev-content'>
        <div className='prev-section'>
          <div class='box sec1'>
            1
          </div>
          <div class='box sec2'>2
          </div>
          <div class='box sec3'>3
          </div>
        </div>
      </div>
    </>
  )
}

export default Prevent;