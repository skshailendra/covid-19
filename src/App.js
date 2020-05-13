import React from 'react';
import './App.scss';
import Layout from './Layout/PageLayout/Layout';
import {BrowserRouter} from 'react-router-dom';

const App = props=> {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
