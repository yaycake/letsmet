import React from 'react';
import styles from './InfoButton.module.css';

const infoButton = ( props ) =>  (
    <button onClick={props.infoClicked} className={ styles.InfoButton }> 
        I
    </button>
);

export default infoButton; 