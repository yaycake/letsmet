import React, { useEffect, Suspense, useCallback } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import * as actions from './store/actions/index'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import BrowseArt from './containers/BrowseArt/BrowseArt';
import About from './components/About/About'
import { useDispatch, useSelector } from 'react-redux';
import Auth from './containers/Auth/Auth';

import Logout from './containers/Auth/Logout/Logout'

import Gallery from './containers/Gallery/Gallery'

// const Artwork = React.lazy(()=> {
//   return import('./containers/Artwork')
// })


const App = props => {

  const isAuthenticated = useSelector(state => state.auth.token != null)

 


  const dispatch = useDispatch();

  const fetchArtObjects = useCallback(
    () => {
    dispatch(actions.initArtObjects())
  }, [dispatch])


  let routes = (
    <Switch>
       <Route path="/about" component = { About }/>
        <Route path="/auth" component = { Auth }/>
        <Route path="/" exact component = { BrowseArt }/>
        <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/gallery" exact component = { Gallery }/>
        <Route path="/about" component = { About }/>
        <Route path="/auth" component = { Auth }/>
        <Route path="/logout" exact component = { Logout }/>
        <Route path="/" exact component = { BrowseArt }/>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Layout>
      <div className="App">
       { routes }
      </div>
    </Layout>
  );
}

export default App;
