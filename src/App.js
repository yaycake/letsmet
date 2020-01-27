import React, {useCallback, useEffect} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import * as actions from './store/actions/index'
import { Route, Switch, Redirect } from 'react-router-dom'
import BrowseArt from './containers/BrowseArt/BrowseArt';


import { useSelector, useDispatch } from 'react-redux';
// import Auth from './containers/Auth/Auth';
// import About from './components/About/About'
// import Logout from './containers/Auth/Logout/Logout'
// import FullArt from './components/Artwork/FullArt/FullArt'

// const Artwork = React.lazy(()=> {
//   return import('./components/Artwork/Artwork')
// })

const About = React.lazy(() => {
  return import ('./components/About/About')
})

const Logout = React.lazy(()=> {
  return import ('./containers/Auth/Logout/Logout')
})

const Auth = React.lazy (()=> {
  return import ('./containers/Auth/Auth')
})

const FullArt = React.lazy(()=> {
  return import('./components/Artwork/FullArt/FullArt')
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
       <Route path="/about" component = { () => <About {...props}/> }/>
        <Route path="/auth" component = { () => <Auth {...props} />  }/>
        <Route path="/" exact component = { BrowseArt }/>
        <Route path="/view" exact component = { () => <FullArt {...props} /> }/>
        <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/about" component = { () => <About {...props}/>  }/>
        <Route path="/auth" component = { () => <Auth {...props} /> }/>
        <Route path="/logout" exact component = {() => <Logout {...props} />}/>
        <Route path="/" exact component = { BrowseArt }/>
        <Route path="/view" exact component = { () => <FullArt {...props}/> }/>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Layout>
      <div className="App" onMouseMove = { eyeAnimate }>
       { routes }
      </div>
    </Layout>
  );
}

export default App;
