import React from 'react';
import styles from './NavigationLink.module.css';
import { NavLink } from 'react-router-dom'
const NavigationLink = ( props ) => (
    <div className={ styles.NavigationLink }>
        <NavLink to= {props.path} exact className = {styles.NavLink}
        activeClassName = {styles.activeNavigationLink}>
            { props.children } 
        </NavLink> 
    </div>
);

export default NavigationLink;