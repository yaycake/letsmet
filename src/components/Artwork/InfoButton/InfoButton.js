import React from 'react';
import styles from './InfoButton.module.css';

const infoButton = ( props ) =>  {

    let classes = [styles.InfoButton]

    if (props.showInfo) {
        classes = [styles.ActiveInfo, styles.InfoButton]
    };

    return (
        <button 
            aria-label = "Click To View Art Info"
            tabindex="0" 
            onClick={props.infoClicked} className={ classes.join(' ') }> 
                i
        </button>
    )
};

export default infoButton; 