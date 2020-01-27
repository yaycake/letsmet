import React from 'react'
import styles from './MobileMenu.module.css'
import NavigationLink from '../Navigation/NavigationLink/NavigationLink'; 

import { NavLink } from 'react-router-dom';

const MobileMenu = (props) => {

    let attachedClasses = [styles.MobileMenu, styles.Close];

    if (props.open){
        attachedClasses = [styles.MobileMenu, styles.Open]
    } 

    let links = (
        <div className = {styles.mobileNavLinks}>
            <div className = {styles.mobileTitle}>
                    <NavLink to="/">
                        LETS MET
                    </NavLink> 
                </div>

            <div 
                className = {styles.NavLinks}
                aria-label="Click To View About" 
                alt = "Click to View About"
            > 
                <NavigationLink 
                    path = "/about"
                    className = {styles.AboutLink}
                    >ABOUT
                </NavigationLink>
            </div>
            <div 
                aria-label="Click To Sign In" 
                alt = "Click to Sign In"
                className = {styles.NavLinks}
            > 
                <NavigationLink path = "/auth">
                    Curate
                </NavigationLink>
            </div>
        </div>
    )

    if (props.isAuth) {
        links = (
            <div className = {styles.mobileNavLinks}>
                <div className = {styles.mobileTitle}>
                    <NavLink to="/">
                        LETS MET
                    </NavLink> 
                </div>
               <div 
                    aria-label="Click To View About"
                    alt = "Click To View About"
                    className = {styles.NavLinks}> 
                    <NavigationLink 
                        path = "/about"
                        className = {styles.AboutLink}
                        >ABOUT
                    </NavigationLink>
                </div>

                <div 
                    aria-label="Click To Sign Out" 
                    alt = "Click to Sign Out"
                    className={styles.NavLinks}> 
                    <NavigationLink path = "/logout">
                        Sign Out
                    </NavigationLink>
                </div>
            </div>
        )
    }
    return (
        <div className={attachedClasses.join(' ')}
            onClick = {props.clicked}
        >
            <div className = {styles.backdrop}></div>
            {links}
        </div>
        
    )
}

export default MobileMenu;