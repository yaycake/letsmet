import React from 'react';
import styles from './Navigation.module.css'; 
import NavigationLink from './NavigationLink/NavigationLink'; 
import Logo from '../Logo/Logo'; 
import PageTitle from '../PageTitle/PageTitle';
import {useSelector} from 'react-redux'

const Navigation = props => {

    const isAuthenticated = useSelector(state => state.auth.token != null)

    const username = useSelector(state => state.auth.username)

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
                    Curate
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
                    <NavigationLink path ="/gallery">
                        Gallery
                    </NavigationLink>
                </div>

                <div className={[styles.rotateLink, styles.signOut].join(' ')}> 
                    <NavigationLink path = "/logout">
                        Sign Out
                    </NavigationLink>
                </div>
                
            </div>
            
        )
    }

   

    let title = "LETS MET"

    if (isAuthenticated){
        title = `${ username } -GGENHEIM`
    }

    return (
        <div className = {styles.Navigation}>
            <PageTitle pageTitle = {title}></PageTitle>
            <Logo></Logo>
            {userOptions}   
        </div>
    )
}

export default Navigation;