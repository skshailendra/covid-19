import React from 'react';
import './Backdrop.scss';

const Backdrop = React.memo(props =>(
    <div className={`backdrop ${props.transparent}`} onClick={props.clickBackdrop}></div>
));

export default Backdrop;