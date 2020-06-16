import React , {Suspense, lazy} from 'react';
import {Route} from 'react-router-dom';
import MainContent from '../MainContent/MainContent';
const MainStateContent = lazy(()=> import ('../MainStateContent/MainStateContent'));
const IndiaComponent = lazy(()=> import('../MapComponent/IndiaComponent'));
const FaqComponent = lazy(() => import('../FAQ/Faq'));
const InfoComponent = lazy(() => import('../Info/Info'));


const RoutingComponent = props =>{
  return (
    <>                     
      <Suspense fallback={<div></div>}>
        <Route path="/" exact component ={MainContent} />
        <Route path="/map" exact component ={IndiaComponent} />
        <Route path="/state/:statecode" component ={MainStateContent} />
        <Route path="/faq" component={FaqComponent}/>
        <Route path="/info" component={InfoComponent}/>
      </Suspense>
    </>
  )
};

export default RoutingComponent;