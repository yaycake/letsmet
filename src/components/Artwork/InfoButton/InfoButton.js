import React from 'react';
import styles from './InfoButton.module.css';
import { keyPressHandler } from '../../../shared/utility'

const infoButton = ( props ) =>  {

    let classes = [styles.InfoButton]

    if (props.showInfo) {
        classes = [styles.ActiveInfo, styles.InfoButton]
    };

    return (
        <button 
            aria-label = "Click To View Art Info"
            tabIndex="0" 
            onKeyPress = { (e) => keyPressHandler(e, props.infoClicked) } 
            onClick={props.infoClicked} className={ classes.join(' ') }> 
                i
        </button>
    )
};

export default infoButton; 