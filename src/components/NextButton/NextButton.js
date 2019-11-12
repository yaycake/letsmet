import React from 'react'
import styles from './NextButton.module.css'

const NextButton = ( props ) => {
    return (
        <div className={styles.NextButton} 
            // onClick = {props.clicked}
            >
            {props.children}
        </div>
    )
}

export default NextButton