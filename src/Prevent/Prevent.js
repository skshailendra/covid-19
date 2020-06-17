import React, { useContext } from "react";
import { ThemeContext } from '../context/theme';
import './Prevent.scss';
import Overview from "../Overview/Overview";
import { faHeadSideCough, faThermometerFull, faClinicMedical, faPrescriptionBottle, faUsers,
  faHeadSideCoughSlash, faHeadSideMask, faLungsVirus, faHandshakeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

const Prevent = () => {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <Overview/>
      <div className={`prev-content ${thememode}`}>
        <div className='prev-section'>
          <div class={`box sec1 ${thememode}`}>
            <h3>SYMPTOMS</h3>
            <p>The most common symptoms of COVID-19</p>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faHeadSideCough}  color="#a23d83" className="icon"/>
              </span>
              <span class='main-content'>DRY COUGH</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faThermometerFull}  color="#a23d83" className="icon"/>
              </span>
              <span class='main-content'>HIGH FEVER</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faHeadSideCoughSlash}  color="#a23d83" className="icon"/>
              </span>
              <span class='main-content'>SORE THROAT</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faLungsVirus}  color="#a23d83" className="icon"/>
              </span>
              <span class='main-content'>DIFFICULTY IN BREATHING</span>
            </div>
          </div>
          <div class={`box sec2 ${thememode}`}>
            <h3>HOW IT SPREADS</h3>
            <p>Common medium of disease transmission</p>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faHeadSideCough}  color="#a23d83" className="icon"/>
              </span>
              <span class='main-content'>AIR BY COUGH OR SNEEZE</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faHandshakeSlash}  color="#a23d83" className="icon"/>
              </span>
              <span className='main-content'>PERSONAL CONTACT</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faPrescriptionBottle}  color="#a23d83" className="icon"/>
              </span>
              <span className='main-content'>CONTAMINTATED OBJECTS</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <FontAwesomeIcon icon={faUsers}  color="#a23d83" className="icon"/>
              </span>
              <span className='main-content'>MASS GATHERING</span>
            </div>
          </div>
          <div class={`box sec3 ${thememode}`}>
            <h3>PREVENTION</h3>
            <p>Key messages to spread for prevention of COVID-19</p>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <img src='./img/handwash.jpg' alt='wash hand'/>
              </span>
              <span className='main-content'>WASH YOUR HANDS OFTEN</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <img src='./img/mask.jpg' alt='wash hand'/>
              </span>
              <span className='main-content'>WEAR A FACE MASK</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <img src='./img/tm.jpg' alt='wash hand'/>
              </span>
              <span className='main-content'>AVOID CONTACT WITH SICK PEOPLE</span>
            </div>
            <div className={`img-section ${thememode}`}>
              <span className='icon-sec'>
                <img src='./img/cough.jpg' alt='wash hand'/>
              </span>
              <span className='main-content'>ALWAYS COVER YOUR COUGH AND SNEEZE</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Prevent;