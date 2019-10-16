import React from 'react';
import styles from './Navigation.module.css'; 
import NavigationLink from './NavigationLink/NavigationLink'; 
import Logo from '../Logo/Logo'; 
import PageTitle from '../PageTitle/PageTitle';

const Navigation = props => {

    return (
        <div className = {styles.Navigation}>
            <PageTitle pageTitle = "LETS MET"></PageTitle>
            <Logo></Logo>
            <div className = {styles.mainNavLink}>
                <NavigationLink>ABOUT</NavigationLink>
            </div>
            
        </div>
    )
}

export default Navigation;