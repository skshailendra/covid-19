import React from 'react';
import {Route} from 'react-router-dom';
import MainContent from '../MainContent/MainContent';
import Analysis from '../Analysis/Analysis';
import MainStateContent from '../MainStateContent/MainStateContent';
import IndiaComponent from '../MapComponent/IndiaComponent';

const RoutingComponent = props =>{
    return (
        <>
            <Route path="/" exact component ={MainContent} />
            <Route path="/map" exact component ={IndiaComponent} />
            <Route path="/state/:statecode" component ={MainStateContent} />
        </>      
    )
};

export default RoutingComponent;