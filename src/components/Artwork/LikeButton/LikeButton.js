import React from 'react';
import styles from './LikeButton.module.css';
import bookmarkLiked from '../../UI/Icons/bookmark_solid.svg'
import bookmark from '../../UI/Icons/bookmark_outline.svg'

const likeButton = ( props ) => {
    return (
        <div onClick = {props.click} className={styles.LikeButton}
        >
            <img alt = "Bookmark this art" src={bookmark} className={styles.likeIcon} />
        </div>)
};

export default likeButton; 