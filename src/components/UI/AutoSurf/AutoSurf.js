import React from 'react'; 
import styles from './AutoSurf.module.css'



const AutoSurf = ( props ) => {

    let autoSurfButton = (
        <div className={styles.AutoSurfOff}
            onClick = {props.clicked}>
                <div className = {styles.autoStartIcon}></div> 
            SURF
        </div>
    )

    if (props.autoSurfOn) {
        autoSurfButton = (
        <div 
            className={styles.AutoSurfOn}
            onClick = {props.clicked}
            data-text="STOP"
            
        > 
            <div className = {styles.autoStopCover}>
            </div>
            <div className = {styles.autoStopIcon}>
            </div>

            <div className = {styles.autoStopText}>
                STOP
            </div>
            
        </div>)
    }
    return (
        autoSurfButton
    )

}

export default AutoSurf