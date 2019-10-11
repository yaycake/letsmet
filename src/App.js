import React, { useEffect, Suspense } from 'react';
import './App.css';
// import Layout from './hoc/Layout'
import * as actions from './store/actions/index'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'


// const Artwork = React.lazy(()=> {
//   return import('./containers/Artwork')
// })

function App() {
  return (
    <div className="App">
      <p>YO DIS THE APP</p>
    </div>
  );
}

export default App;
