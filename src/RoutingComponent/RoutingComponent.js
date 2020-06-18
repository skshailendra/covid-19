import React , {Suspense, lazy, useEffect} from 'react';
import {Route} from 'react-router-dom';
import MainContent from '../MainContent/MainContent';
import FaqComponent from '../FAQ/Faq';
import InfoComponent from '../Info/Info';
import Loading from '../UIComponent/Loading/Loading';
import ReactGa from 'react-ga';
const MainStateContent = lazy(()=> import ('../MainStateContent/MainStateContent'));
const IndiaComponent = lazy(()=> import('../MapComponent/IndiaComponent'));
const preventComponent = lazy(() => import('../Prevent/Prevent.js'));

const RoutingComponent = props =>{
  useEffect(()=>{
    ReactGa.initialize('UA-169939716-1');
    ReactGa.pageview(window.location.pathname + window.location.search);
},[]);
  return (
    <>                     
      <Suspense fallback={<div><Loading/></div>}>
        <Route path="/" exact component ={MainContent} />
        <Route path="/map" exact component ={IndiaComponent} />
        <Route path="/state/:statecode" component ={MainStateContent} />
        <Route path="/faq" component={FaqComponent}/>
        <Route path="/info" component={InfoComponent}/>
        <Route path="/prevention" component={preventComponent}/>
      </Suspense>
    </>
  )
};

export default RoutingComponent;