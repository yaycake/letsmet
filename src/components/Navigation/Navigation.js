import React from 'react';
import styles from './Navigation.module.css'; 
import NavigationLink from './NavigationLink/NavigationLink'; 
import Logo from '../Logo/Logo'; 
import PageTitle from '../PageTitle/PageTitle';
import {useSelector} from 'react-redux';
import MenuToggle from '../MobileMenu/MenuToggle/MenuToggle'

const Navigation = props => {

    const isAuthenticated = useSelector(state => state.auth.token != null)

    const username = useSelector(state => state.auth.username)

    let userOptions = (
        <nav className = {styles.mainNavLinks}>
            

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

            <MenuToggle 
                clicked = { props.menuToggleClicked }
            ></MenuToggle>
            
            
        </nav>
    )

    if (isAuthenticated) {
        userOptions = (

            <nav className = {styles.mainNavLinks}>
                <MenuToggle 
                    clicked = { props.menuToggleClicked }
                ></MenuToggle>
                <div 
                    aria-label="Click To View About"
                    alt = "Click To View About"
                    className={styles.rotateLink}> 
                    <NavigationLink 
                        path = "/about"
                        className = {styles.AboutLink}
                        >ABOUT
                    </NavigationLink>
                </div>

                <div 
                    aria-label="Click To Sign Out" 
                    alt = "Click to Sign Out"
                    className={[styles.rotateLink, styles.signOut].join(' ')}> 
                    <NavigationLink path = "/logout">
                        Sign Out
                    </NavigationLink>
                </div>
                
            </nav>
            
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