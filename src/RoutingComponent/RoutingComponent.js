import React from 'react';
import {Route} from 'react-router-dom';
import MainContent from '../MainContent/MainContent';
import Analysis from '../Analysis/Analysis';

const RoutingComponent = props =>{
    return (
        <>
            <Route path="/" exact component ={MainContent} />
            <Route path="/analysis" exact component ={Analysis} />
        </>      
    )
};

export default RoutingComponent;