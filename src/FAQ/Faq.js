import React, { useState, useCallback } from "react";
import classNames from 'classnames';
import "./Faq.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const questionAnswerList = [
  {
    id: 1,
    qn: "What is a coronavirus?",
    ans: `Coronaviruses are a large family of viruses which may cause illness in animals or humans.  In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS).
         The most recently discovered coronavirus causes coronavirus disease COVID-19.`,
  },
  {
    id: 2,
    qn: "What is COVID-19?",
    ans: `COVID-19 is the infectious disease caused by the most recently discovered coronavirus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019. 
          COVID-19 is now a pandemic affecting many countries globally.`,
  },
  {
    id: 3,
    qn: "Why should I wash my hands frequently?",
    ans: `It is very important to regularly wash and clean your hands with soap and warm water for 20 seconds or use an alcohol based hand sanitizer which will kill viruses that may be on your hands. `,
  },
  {
    id: 4,
    qn: "How do I know if it is COVID-19 or just the common flu?",
    ans: `A COVID-19 infection has the same signs and symptoms as the common cold so you can only differentiate between them through lab testing to determine the virus type. `,
  },
  {
    id: 5,
    qn: "Can the virus that causes COVID-19 be transmitted through the air?",
    ans: `Studies to date suggest that the virus that causes COVID-19 is mainly transmitted through contact with respiratory droplets rather than through the air. If new data arises, we will be sure to update you on it. `,
  },
  {
    id: 6,
    qn: "What is the community spread of Covid-19?",
    ans: `It is when people who do not have any travel history and are not in contact with people who have contracted the disease yet still show symptoms of the virus and are unaware of the source.  `,
  },
  {
    id: 7,
    qn: "Should I worry about COVID-19?",
    ans: `Yes ideally you should be worried about the spread of the virus. As suggested by the UN, about 1 in every 5 people who catch it need hospital care. It is therefore quite normal for people to worry about how the COVID-19 outbreak will affect them and their loved ones.To protect ourselves, as recommended by the UN, first and foremost is to regularly and thoroughly wash hands and maintain good respiratory hygiene. Secondly, keep yourself informed and follow the advice of the local central and state health authorities including any restrictions put in place on travel, movement and gatherings.`,
  },
];

const Faq = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const expandRow = (nextActiveIndex) => {
    setActiveIndex(nextActiveIndex);
  };

  return (
    <div>
      <div className="main-faq-content">
        <div className="faq-header">
          <h4>The central helpline number: 011-23978046</h4>
        </div>
        <div className="faq-content">
          <div className="qn-content">
            {questionAnswerList.map((questionAnswer, idx) => (
              <div className={classNames('accord-content', { open: activeIndex === idx })}>
                <h3>{questionAnswer.qn}</h3>
                <span onClick={() => expandRow(idx)}>
                  <FontAwesomeIcon
                    icon={activeIndex === idx ? faPlusCircle : faPlusCircle}
                    size="sm"
                  />
                </span>
               
                <p>{questionAnswer.ans}</p>
              </div>
            ))}
          </div>
          <div className="qn-content qn-media-content"></div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
