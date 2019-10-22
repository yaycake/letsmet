import React from 'react';
import styles from './LikeButton.module.css';

const likeButton = ( props ) => {
    return (
        <div onClick = {props.clicked} className={styles.LikeButton}>
        </div>)
};

export default likeButton; 