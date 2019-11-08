import React from 'react'; 
import styles from './Logo.module.css';

const logo = ( props ) => {

   return (
        <div className = {styles.Logo}>
            <div id = "LogoBall" className = {styles.LogoBall}>
            {/* <div className = {styles.InnerCircle}/> */}
        </div>
    
    </div>)
};

export default logo;