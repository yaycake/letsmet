import React, { useEffect, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import * as actions from './store/actions/index'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import BrowseArt from './containers/BrowseArt/BrowseArt';
import About from './components/About/About'
import { useDispatch, useSelector } from 'react-redux';

// const Artwork = React.lazy(()=> {
//   return import('./containers/Artwork')
// })


const App = props => {

  const dispatch = useDispatch();

  // const fetchArtObjects = () => {
  //   dispatch(actions.initArtObjects())
  // }

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
        <Route path="/" component = { BrowseArt }/>
      </div>
    </Layout>
  );
}

export default App;
