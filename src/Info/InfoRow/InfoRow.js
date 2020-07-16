import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme";

export default function InfoRow({ questionAnswer }) {
  const { thememode } = useContext(ThemeContext);
  return (
    <>
      <div className={`qn-cont ${thememode}`}>
        <h4>{questionAnswer.qn}</h4>
        <p dangerouslySetInnerHTML={{ __html: questionAnswer.ans }} />
      </div>
    </>
  );
}
