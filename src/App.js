import React, { useEffect, Suspense, useCallback } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import * as actions from './store/actions/index'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import BrowseArt from './containers/BrowseArt/BrowseArt';
import About from './components/About/About'
import { useDispatch, useSelector } from 'react-redux';
import Auth from './containers/Auth/Auth';

// const Artwork = React.lazy(()=> {
//   return import('./containers/Artwork')
// })


const App = props => {

  const dispatch = useDispatch();

  const fetchArtObjects = useCallback(
    () => {
    dispatch(actions.initArtObjects())
  }, [dispatch])

  // useEffect(()=>{
  //   fetchArtObjects();
  // }, [])


  // let routes = (
  //   <Switch>
      
     
  //   </Switch>
  // )

  return (
    <Layout>
      <div className="App">
        
        <Route path="/about" component = { About }/>
        <Route path="/auth" component = { Auth }/>
        <Route path="/" exact component = { BrowseArt }/>
      </div>
    </Layout>
  );
}

export default App;
