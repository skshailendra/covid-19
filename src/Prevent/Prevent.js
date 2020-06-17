import React, { useContext } from "react";
import { ThemeContext } from '../context/theme';
import './Prevent.scss';
import Overview from "../Overview/Overview";
import { faHeadSideCough, faThermometerFull, faClinicMedical, 
  faHeadSideCoughSlash, faHeadSideMask, faLungsVirus, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

const Prevent = () => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <Overview/>
      <div className='prev-content'>
        <div className='prev-section'>
          <div class='box sec1'>
            <h3>SYMPTOMS</h3>
            <p>Symptoms may varies person to person, here are some common.</p>
            <div className='img-section'>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faHeadSideCough}  color="#a23d83" className="icon"/>
              </span>
              <p>DRY COUGH</p>
            </div>
            <div className='img-section'>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faThermometerFull}  color="#a23d83" className="icon"/>
              </span>
              <p>HIGH FEVER</p>
            </div>
            <div className='img-section'>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faHeadSideCoughSlash}  color="#a23d83" className="icon"/>
              </span>
              <p>SORE THROAT</p>
            </div>
            <div className='img-section'>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faLungsVirus}  color="#a23d83" className="icon"/>
              </span>
              <p>DIFFICULTY IN BREATHING</p>
            </div>
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