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
        <NavigationLink path = "/auth">
            Sign In
        </NavigationLink>
    )

    if (isAuthenticated) {
        userOptions = (
            <div>
                <NavigationLink path = "/logout">
                    Sign Out
                </NavigationLink>
                <NavigationLink path ="/gallery">
                    My Gallery
                </NavigationLink>
            </div>
            
        )
    }

    return (
        <div className = {styles.Navigation}>
            <PageTitle pageTitle = "LETS MET"></PageTitle>
            <Logo></Logo>
            <div className = {styles.mainNavLink}>
                <NavigationLink 
                    path = "/about"
                    className = {styles.AboutLink}
                    >ABOUT
                </NavigationLink>
                <div className = {styles.signinNavLink}>
                    {userOptions}
                </div>
            </div>
            
            
        </div>
    )
}

export default Navigation;