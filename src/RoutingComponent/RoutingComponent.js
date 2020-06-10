import React , {Suspense, lazy} from 'react';
import {Route} from 'react-router-dom';
import MainContent from '../MainContent/MainContent';
import Loading from '../UIComponent/Loading/Loading';
const MainStateContent = lazy(()=> import ('../MainStateContent/MainStateContent'));
const IndiaComponent = lazy(()=> import('../MapComponent/IndiaComponent'));


const RoutingComponent = props =>{
    return (
        <>            
            
            <Suspense fallback={<Loading/>}>
                <Route path="/" exact component ={MainContent} />
                <Route path="/map" exact component ={IndiaComponent} />
                <Route path="/state/:statecode" component ={MainStateContent} />
            </Suspense>
        </>      
    )
};

export default RoutingComponent;