import React, { useState } from 'react';

import Navigation from '../../components/Navigation/Navigation'
import styles from './Layout.module.css';

// import PreviewTile from '../../components/PreviewTile/PreviewTile'; 

const Layout = props => {

    const [menuDrawerIsVisible, setMenuDrawerIsVisible] = useState(false);

    const menuDrawerClosedHandler = () => {
        setMenuDrawerIsVisible(false)
    }

    const menuDrawerToggleHandler = () => {
        setMenuDrawerIsVisible(!menuDrawerIsVisible)
    }


    return (
        <main className = {styles.Layout}>
            <Navigation
                menuToggleClicked = { menuDrawerToggleHandler }
            > </Navigation>
            <div className= { styles.App }>
                { props.children }
            </div>
        </main>
    )
}

export default Layout;
