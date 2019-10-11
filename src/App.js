import React, { useEffect, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import * as actions from './store/actions/index'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Artwork from './components/Artwork/Artwork';
import About from './components/About/About'

// const Artwork = React.lazy(()=> {
//   return import('./containers/Artwork')
// })


const App = props => {

  let routes = (
    <Switch>
      <Route path="/" component = { Artwork }/>
      <Route path = "/about" render= {()=> <About {...props} />}/>
    </Switch>
  )

  return (
    <Layout>
      <div className="App">
        <p>YO DIS THE APP</p>
        {routes}
      </div>
    </Layout>
  );
}

export default App
