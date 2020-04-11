import React , {useEffect,useState} from 'react';
import classes from './App.module.css';
import Layout from './components/Layouts/Layout/Layout'
import StoriesContainer from './containers/StoriesContainer/StoriesContainer'
import {BrowserRouter} from 'react-router-dom'


function App() { 


  return (
    

    <BrowserRouter>

    <div className={classes.App}>
      <Layout></Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
