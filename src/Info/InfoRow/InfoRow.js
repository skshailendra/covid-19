import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InfoRow({ questionAnswer }) {

  return (
    <>
      <div className="qn-header">
        <span className="qn">{questionAnswer.qn}</span>
        <span className="qn-icon">
          <FontAwesomeIcon
            className="icon-s"
            size="sm"
          />
        </span>
      </div>

      <p>{questionAnswer.ans}</p>
      <hr />
    </>
  );
}
