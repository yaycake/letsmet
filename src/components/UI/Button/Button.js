import React from 'react'
import styles from './Button.module.css'
import { keyPressHandler} from '../../../shared/utility'

const button = ( props ) => {

    let buttonStyles = [];

    if (props.btnType === 'success'){
        buttonStyles = [styles.ButtonSuccess, styles.Button];
    }
    if (props.btnType === 'secondary'){
        buttonStyles = [styles.ButtonSecondary, styles.Button];
    }

    return (
        <button 
            aria-label={`Click to ${props.children}`}
            tabIndex="0"
            type = {props.type}
            className= { buttonStyles.join(' ') }
            onKeyPress = { (e) => keyPressHandler(e, props.clicked) } 
            onClick = { props.clicked }>
                { props.children }
        </button>

    )
}

export default button;