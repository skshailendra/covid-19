import React , {Suspense, lazy} from 'react';
import {Route} from 'react-router-dom';
import MainContent from '../MainContent/MainContent';
import FaqComponent from '../FAQ/Faq';
import InfoComponent from '../Info/Info';
import Loading from '../UIComponent/Loading/Loading';
const MainStateContent = lazy(()=> import ('../MainStateContent/MainStateContent'));
const IndiaComponent = lazy(()=> import('../MapComponent/IndiaComponent'));
const preventComponent = lazy(() => import('../Prevent/Prevent.js'));

const RoutingComponent = props =>{
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