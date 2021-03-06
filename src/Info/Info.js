import React, { useContext, useEffect } from "react";
import "./Info.scss";
import InfoRow from "./InfoRow";
import Overview from "../Overview/Overview";
import { ThemeContext } from "../context/theme";
import ReactGa from "react-ga";
import { Helmet, HelmetProvider } from "react-helmet-async";
const questionAnswerList = [
  {
    id: 1,
    qn: "Is this a official website?",
    ans: `No, this is not an official website. It is an open source initiative.`,
  },
  {
    id: 2,
    qn: "What are your sources for data?",
    ans: `The data used in this project are part of this <a class='a-tag' target='_blank' href="https://api.covid19india.org/">API</a> and may varies with the actual data. Thanks to all the people around the globe for this open source API.`,
  },
  {
    id: 3,
    qn: "About Us",
    ans: `We are couple of volunteers came together to build this COVID tracking App.`,
  },
];

const Info = () => {
  const { thememode } = useContext(ThemeContext);
  useEffect(() => {
    ReactGa.initialize("UA-169939716-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  });
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>COVID-19 Tracker -Info</title>
          <meta name="title" content="COVID-19 Tracker India Info" />
          <meta
            name="description"
            content="COVID-19 Tracker India Info Section. COVID-19 API and people involved."
          />
          <link
            rel="canonical"
            href="https://trackcovid19india.web.app/info/"
          />
        </Helmet>
      </HelmetProvider>
      <Overview />
      <div className="main-info-content">
        <div className={`faq-content ${thememode}`}>
          <div className={`qn-content ${thememode}`}>
            {questionAnswerList.map((questionAnswer, idx) => (
              <InfoRow key={idx} questionAnswer={questionAnswer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
