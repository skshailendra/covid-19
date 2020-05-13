import React from 'react';
import './Card.scss';

const Card = props =>{
    const classList = ["card"];
    classList.push(props.className ? props.className:"");
    return (
        <>
        <div className={classList.join(" ")}>
            {props.children}
        </div>
        </>
    )
};

export default Card;