import React, { useState, useCallback } from "react";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

export default function FAQRow({ questionAnswer }) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = useCallback(() => setIsActive(!isActive), [isActive]);

  return (
    <div
      className={classNames("accord-content", { open: isActive })}
    >
      <div className="qn-header">
        <span className="qn">{questionAnswer.qn}</span>
        <span onClick={toggleActive} className="qn-icon">
          <FontAwesomeIcon
            className="icon-s"
            icon={isActive ? faMinusCircle : faPlusCircle}
            size="sm"
          />
        </span>
      </div>

      <p>{questionAnswer.ans}</p>
      <hr />
    </div>
  );
}
