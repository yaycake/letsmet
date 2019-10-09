import React from 'react';
import styles from './NavigationLink.module.css';

const navigationLink = ( props ) => (
    <div className={ styles.NavigationLink }>
        <NavLink to= { props.link } exact activeClassName = {styles.activeNavigationLink}>
            { props.children }
        </NavLink> 
    </div>
);

export default navigationLink;