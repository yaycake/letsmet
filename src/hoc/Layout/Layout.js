import React from 'react';
import Navigation from '../../components/Navigation/Navigation'
import styles from './Layout.module.css';

// import PreviewTile from '../../components/PreviewTile/PreviewTile'; 

const Layout = props => {
    return (
        <div className = {styles.Layout}>
            <Navigation> </Navigation>
            <div className= { styles.App }>
                { props.children }
            </div>
        </div>
    )
}

export default Layout;
