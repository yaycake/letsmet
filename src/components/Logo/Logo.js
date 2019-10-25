import React from 'react'; 
import styles from './Logo.module.css';


const logo = ( props ) => (
    <div className = {styles.Logo}>
        <div className = {styles.LogoCircle}>
            <div className = {styles.InnerCircle}/>
        </div>
        
    </div>
);

export default logo;