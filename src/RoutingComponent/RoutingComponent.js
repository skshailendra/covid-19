import React , {Suspense, lazy} from 'react';
import {Route} from 'react-router-dom';
const MainContent = lazy(()=> import('../MainContent/MainContent'));
const MainStateContent = lazy(()=> import ('../MainStateContent/MainStateContent'));
const IndiaComponent = lazy(()=> import('../MapComponent/IndiaComponent'));


const RoutingComponent = props =>{
    return (
        <>            
            <Suspense fallback={<div>Loading ...</div>}>
                <Route path="/" exact component ={MainContent} />
                <Route path="/map" exact component ={IndiaComponent} />
                <Route path="/state/:statecode" component ={MainStateContent} />
            </Suspense>
        </>      
    )
};

export default RoutingComponent;