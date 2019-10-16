import React from 'react';
import styles from './InfoButton.module.css';

const infoButton = ( props ) =>  {

    let classes = [styles.InfoButton]

    if (props.showInfo) {
        console.log('INFO SHOWING!')
        classes = [styles.ActiveInfo, styles.InfoButton]
    };

    return (
        <button onClick={props.infoClicked} className={ classes.join(' ') }> 
            i
        </button>
    )
};

export default infoButton; 