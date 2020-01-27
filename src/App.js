import React, {useCallback, useEffect, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import * as actions from './store/actions/index'
import { Route, Switch, Redirect } from 'react-router-dom'

import BrowseArt from './containers/BrowseArt/BrowseArt';

import { useSelector, useDispatch } from 'react-redux';
// import About from './components/About/About'
// import Auth from './containers/Auth/Auth';

// import Logout from './containers/Auth/Logout/Logout'
// import FullArt from './components/Artwork/FullArt/FullArt'


const Auth = React.lazy(()=> {
  return import('./containers/Auth/Auth')
})

const About = React.lazy(() => {
  return import ('./components/About/About')
})
const Logout = React.lazy(()=> {
 return import ('./containers/Auth/Logout/Logout')
})

const FullArt = React.lazy( () => {
  return import ('./components/Artwork/FullArt/FullArt')
})


const App = props => {

  const isAuthenticated = useSelector(state => state.auth.token != null)

  const dispatch = useDispatch();

  const fetchArtObjects = useCallback(
    () => { dispatch(actions.initArtObjects())},[dispatch]) 

  useEffect(()=> {
    fetchArtObjects()
  },[fetchArtObjects])

  const onFetchArt = 
    () => {dispatch(actions.fetchArt())}

  useEffect (() => {
      onFetchArt();
  }, [])

  // document.onkeydown = function(e) {
  //   if(e.keyCode === 13) { // The Enter/Return key
  //     document.activeElement.click(e);
  //   }
  // };



  const eyeAnimate = (event) => {
    let ball = document.getElementById("LogoBall");
    let x = event.clientX * 50 / window.innerWidth + "%"
    let y = event.clientY * 60 / window.innerHeight + "%"
    ball.style.left = x; 
    ball.style.top = y;
    ball.style.transform = "translate("+x+", "+y+")"
}

  let routes = (
    <Switch>
       <Route path="/about" component = { (props) => <About {...props}/> }/>
        <Route path="/auth" component = { (props) => <Auth {...props}/> }/>
        <Route path="/" exact component = { BrowseArt }/>
        <Route path="/view" exact component = { (props) => <FullArt {...props}/> }/>
        <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/about" component = { (props) => <About {...props}/> }/>
        <Route path="/auth" component = { (props) => <Auth {...props}/> }/>
        <Route path="/logout" exact component = { (props) => <Logout {...props}/> }/>
        <Route path="/" exact component = { BrowseArt }/>
        <Route path="/view" exact component = { (props) => <FullArt {...props}/> }/>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Layout>
      <div className="App" onMouseMove = { eyeAnimate }>
      <Suspense fallback = { <p> Loading ... </p>} >
        { routes }
      </Suspense>
      </div>
    </Layout>
  );
}

export default App;
