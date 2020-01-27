import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import artworkReducer from './store/reducers/artwork'; 
import authReducer from './store/reducers/auth';
import galleryReducer from './store/reducers/gallery';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';


const composeEnhancers = composeWithDevTools({trace: true})

const appReducer = combineReducers({

    artwork: artworkReducer, 
    auth: authReducer, 
    myGallery: galleryReducer,
})

const rootReducer = (state,action) =>{
    if (action.type === 'AUTH_LOGOUT') {
        state = undefined
    }
    return appReducer(state,action)
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={ store }>
        {/* <BrowserRouter> */}
            <App />
        {/* </BrowserRouter> */}
    </Provider>, document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register()
