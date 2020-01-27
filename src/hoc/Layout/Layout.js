import React, { useState } from 'react';

import Navigation from '../../components/Navigation/Navigation'
import styles from './Layout.module.css';
import MobileMenu from '../../components/MobileMenu/MobileMenu'
import {useSelector} from 'react-redux';

// import PreviewTile from '../../components/PreviewTile/PreviewTile'; 

const Layout = props => {

    const [menuDrawerIsVisible, setMenuDrawerIsVisible] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.token != null)

    const menuDrawerClosedHandler = () => {
        console.log("clicked : menuDrawerClosedHandler")
        setMenuDrawerIsVisible(false)
        console.log(menuDrawerIsVisible)
    }

    const menuDrawerToggleHandler = () => {
        setMenuDrawerIsVisible(!menuDrawerIsVisible)
    }

    let appStyle = [styles.App]

    if (menuDrawerIsVisible) {
        appStyle = [styles.App, styles.blur]
    }

    return (
        <main className = {styles.Layout}>
            <Navigation menuToggleClicked = { menuDrawerToggleHandler }> 
            </Navigation>
            <MobileMenu
                isAuth = {isAuthenticated}
                open={menuDrawerIsVisible}
                closed = {menuDrawerClosedHandler}
                clicked = { menuDrawerToggleHandler }
            />
            <div className= { appStyle.join(' ') }>
                { props.children }
            </div>
        </main>
    )
}

export default Layout;
