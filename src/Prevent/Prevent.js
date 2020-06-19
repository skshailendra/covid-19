import React, { useContext , useEffect} from "react";
import { ThemeContext } from '../context/theme';
import './Prevent.scss';
import Overview from "../Overview/Overview";
import { faHeadSideCough, faThermometerFull, faPrescriptionBottle, faUsers,
  faHeadSideCoughSlash, faLungsVirus, faHandshakeSlash
} from "@fortawesome/free-solid-svg-icons";

import ReactGa from 'react-ga';
import PreventRow from "./PreventRow/PreventRow";
import PreSectionRow from "./PreventRow/PreSectionRow";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import MythRow from "./PreventRow/MythRow";

const mythList1 = [
  {
    myth: 'Sunlight can kill the new Coronavirus',
    fact: 'According to WHO, there is no evidence to prove that Sunlight kills the new Coronavirus',
    img: './img/sun.jpg'
  },
  {
    myth: 'Coronavirus gets automatically destroyed in High Temperature',
    fact: 'Given its novelty, it has not been proven yet if it gets destroyed in high temperature or not.',
    img: './img/ht.jpg'
  },
  {
    myth: 'The virus survives a few hours',
    fact: 'Studies suggest that coronaviruses may persist on surfaces for a few hours or up to several days. This may vary under diffrent condition',
    img: './img/corona_2.jpg'
  },
]

const mythList2 = [
  {
    myth: "If you can hold your breath for 10 seconds without discomfort, you don't have COVID-19",
    fact: "Holding your breath for more than 10 seconds without discomfort does not prove whether you are infected or not",
    img: './img/br.jpg'
  },
  {
    myth: 'The incubation period is up to 5 days',
    fact: 'The "incubation period" means the time between catching the virus and beginning to have symptoms of the disease. Most estimates range from 1-14 days',
    img: './img/qr.jpg'
  },
  {
    myth: 'Inhaling steam from hot water kills the Coronavirus',
    fact: "No, inhaling steam doesn't kill the the Coronavirus",
    img: './img/cf.jpg'
  },
];

const mythList3 = [
  {
    myth: 'COVID-19 spreads through consumption of chicken, eggs and meat',
    fact: 'There is no conclusive evidence that cooked food transmits the disease',
    img: './img/food.jpg'
  },
  {
    myth: 'COVID-19 spread through pets',
    fact: 'The transmission of disease has not been seen through pets',
    img: './img/pet.jpg'
  },
  {
    myth: 'Dead body of a person infected with Corona Virus transmit the infection',
    fact: 'No transmission of Corona Virus infection from the dead body of the the person',
    img: './img/md.jpg'
  },
  {
    myth: 'Antibiotics effective in preventing and treating the new coronavirus',
    fact: 'No, antibiotics do not work against viruses, only bacteria',
    img: './img/tm.jpg'
  }
];

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
            <PreSectionRow key='1' content='DRY COUGH' imgName='./img/cou.jpg' />
            <PreSectionRow key='2' content='HIGH FEVER' imgName='./img/fever.png' />
            <PreSectionRow key='3' content='SORE THROAT' imgName='./img/sr.jpg' />
            <PreSectionRow key='4' content='DIFFICULTY IN BREATHING' imgName='./img/br.png' />
          </div>

          <div className={`box sec2 ${thememode}`}>
            <h3>HOW IT SPREADS</h3>
            <p>Common medium of disease transmission</p>
            <PreSectionRow key='5' content='AIR BY COUGH OR SNEEZE' imgName='./img/sz.jpg' />
            <PreSectionRow key='6' content='PERSONAL CONTACT' imgName='./img/sk.jpg' />
            <PreSectionRow key='7' content='CONTAMINTATED OBJECTS' imgName='./img/co.jpg' />
            <PreSectionRow key='8' content='MASS GATHERING' imgName='./img/mg.jpg' />
          </div>

          <div className={`box sec3 ${thememode}`}>
            <h3>PREVENTION</h3>
            <p>We must follow these to prevent from COVID-19</p>
            <PreSectionRow key='9' content='WASH YOUR HANDS OFTEN' imgName='./img/handwash.jpg'/>
            <PreSectionRow key='10' content='WEAR A FACE MASK' imgName='./img/mask.jpg'/>
            <PreSectionRow key='11' content='KEEP SOCIAL DISTANCING' imgName='../img/sdd.jpg'/>
            <PreSectionRow key='12' content='COVER MOUTH WHILE SNEEZING' imgName='./img/cough.jpg'/>
          </div>
        </div>

        <div className='prev-section'>

          <div className={`myth-box sec1 ${thememode}`}>
            <MythRow mythList={mythList1}/>
          </div>

          <div className={`myth-box sec2 ${thememode}`}>
            <MythRow mythList={mythList2}/>
          </div>

          <div className={`myth-box sec3 ${thememode}`}>
            <MythRow mythList={mythList3}/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Prevent;