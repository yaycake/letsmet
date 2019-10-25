import React from 'react';
import styles from './Navigation.module.css'; 
import NavigationLink from './NavigationLink/NavigationLink'; 
import Logo from '../Logo/Logo'; 
import PageTitle from '../PageTitle/PageTitle';
import {useSelector, useDispatch } from 'react-redux'

const Navigation = props => {

    const isAuthenticated = useSelector(state => state.auth.token != null)

    const dispatch = useDispatch()

    let userOptions = (
        <div className = {styles.mainNavLinks}>
            <div className={styles.rotateLink}> 
                <NavigationLink 
                    path = "/about"
                    className = {styles.AboutLink}
                    >ABOUT
                </NavigationLink>
            </div>
            <div className={styles.rotateLink}> 
                <NavigationLink path = "/auth">
                    Sign In
                </NavigationLink>
            </div>
            
            
        </div>
    )

    if (isAuthenticated) {
        userOptions = (

            <div className = {styles.mainNavLinks}>
                <div className={styles.rotateLink}> 
                    <NavigationLink 
                        path = "/about"
                        className = {styles.AboutLink}
                        >ABOUT
                    </NavigationLink>
                </div>
                <div className={styles.rotateLink}> 
                    <NavigationLink path = "/auth">
                        Sign In
                    </NavigationLink>
                </div>
                <div className={styles.rotateLink}> 
                    <NavigationLink path = "/logout">
                        Sign Out
                    </NavigationLink>
                </div>
                <div className={styles.rotateLink}> 
                    <NavigationLink path ="/gallery">
                        Gallery
                    </NavigationLink>
                </div>
                
            </div>
            
        )
    }

    return (
        <div className = {styles.Navigation}>
            <PageTitle pageTitle = "LETS MET"></PageTitle>
            <Logo></Logo>
            {userOptions}   
        </div>
    )
}

export default Navigation;