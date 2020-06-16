import React from "react";

export default function InfoRow({ questionAnswer }) {

  return (
    <>
      <div className='qn-cont'>
        <h4>{questionAnswer.qn}</h4>
        <p dangerouslySetInnerHTML={ { __html: questionAnswer.ans } }/>
      </div><hr/>
    </>
  );
}
