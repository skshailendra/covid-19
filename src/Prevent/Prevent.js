import React, { useContext , useEffect} from "react";
import { ThemeContext } from '../context/theme';
import './Prevent.scss';
import Overview from "../Overview/Overview";
import { faHeadSideCough, faThermometerFull, faPrescriptionBottle, faUsers,
  faHeadSideCoughSlash, faLungsVirus, faHandshakeSlash} from "@fortawesome/free-solid-svg-icons";

import ReactGa from 'react-ga';
import PreventRow from "./PreventRow/PreventRow";
import PreSectionRow from "./PreventRow/PreSectionRow";
const Prevent = () => {
  const { thememode } = useContext(ThemeContext);
  useEffect(()=>{
    ReactGa.initialize('UA-169939716-1');
    ReactGa.pageview(window.location.pathname + window.location.search);
  });
  return (
    <>
      <Overview/>
      <div className={`prev-content ${thememode}`}>
        <div className='prev-section'>
          <div className={`box sec1 ${thememode}`}>
            <h3>SYMPTOMS</h3>
            <p>The most common symptoms of COVID-19</p>
            <PreventRow key='1' content='DRY COUGH' color='#1d6abd' iconName={faHeadSideCough} />
            <PreventRow key='2' content='HIGH FEVER' color='#1d6abd' iconName={faThermometerFull} />
            <PreventRow key='3' content='SORE THROAT' color='#1d6abd' iconName={faHeadSideCoughSlash} />
            <PreventRow key='4' content='DIFFICULTY IN BREATHING' color='#1d6abd' iconName={faLungsVirus} />
          </div>

          <div className={`box sec2 ${thememode}`}>
            <h3>HOW IT SPREADS</h3>
            <p>Common medium of disease transmission</p>
            <PreventRow key='5' content='AIR BY COUGH OR SNEEZE' color='#a23d83' iconName={faHeadSideCough} />
            <PreventRow key='6' content='PERSONAL CONTACT' color='#a23d83' iconName={faHandshakeSlash} />
            <PreventRow key='7' content='CONTAMINTATED OBJECTS' color='#a23d83' iconName={faPrescriptionBottle} />
            <PreventRow key='8' content='MASS GATHERING' color='#a23d83' iconName={faUsers} />
          </div>

          <div className={`box sec3 ${thememode}`}>
            <h3>PREVENTION</h3>
            <p>We must follow these to prevent from COVID-19</p>
            <PreSectionRow key='9' content='WASH YOUR HANDS OFTEN' imgName='./img/handwash.jpg'/>
            <PreSectionRow key='10' content='WEAR A FACE MASK' imgName='./img/mask.jpg'/>
            <PreSectionRow key='11' content='KEEP SOCIAL DISTANCING' imgName='../img/tm.jpg'/>
            <PreSectionRow key='12' content='COVER MOUTH WHILE SNEEZING' imgName='./img/cough.jpg'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Prevent;