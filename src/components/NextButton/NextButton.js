import React from 'react'
import styles from './NextButton.module.css'
import {keyPressHandler} from '../../shared/utility'


const NextButton = ( props ) => {

    let nextButtonStyles = [styles.NextButton]

    if (props.nextstyle ==="back"){
        nextButtonStyles.push(styles.backButton)
    } else if (props.nextstyle === "forward") {
        nextButtonStyles.push(styles.forwardButton)
    }

    return (
        <button 
            className={nextButtonStyles.join(' ')} 
            onKeyPress = { (e) => keyPressHandler(e, props.clicked) } 
            onClick = {props.clicked}
            tabIndex="0"

            aria-label = { props.nextstyle === "back" ? "Click To View Previous Artwork" : "Click For Next Artwork" }

            >
            {props.children}
        </button>
    )
}

export default NextButton