import React from 'react'; 
import styles from './AutoSurf.module.css'
import { keyPressHandler } from '../../../shared/utility'


const AutoSurf = ( props ) => {

    let autoSurfButton = (
        <div className={styles.AutoSurfOff}
            tabIndex="0"
            onKeyPress = { (e) => keyPressHandler(e, props.clicked) } 
            onClick = {props.clicked}>
                <div className = {styles.autoStartIcon}></div> 
            SURF
        </div>
    )

    if (props.autoSurfOn) {
        autoSurfButton = (
        <div 
            className={styles.AutoSurfOn}
            tabIndex="0"
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