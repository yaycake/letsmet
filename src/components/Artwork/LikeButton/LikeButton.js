import React from 'react';
import styles from './LikeButton.module.css';
import bookmarked from '../../UI/Icons/bookmark_solid.svg'
import unbookmarked from '../../UI/Icons/bookmark_outline.svg'

const likeButton = ( props ) => {

    let icon = (
        <img alt = "Bookmark this art" src={unbookmarked} className={styles.likeIcon} />)

    if (props.bookmarkIcon){
        icon = (<img alt = "Unbookmark this art" src={bookmarked} className={styles.likeIcon} />)
    }
    return (
        <div onClick = {props.click} className={styles.LikeButton}
        >
            {icon}
        </div>)
};

export default likeButton; 