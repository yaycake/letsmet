import React from 'react';

import styles from './LikeButton.module.css';
import bookmarked from '../../UI/Icons/bookmark_solid.svg'
import unbookmarked from '../../UI/Icons/bookmark_outline.svg'

const LikeButton = ( props ) => {

    const remove = () => {
        props.bookmarkRemove(props.objectDataId) }

    const add = () => {
        props.bookmarkAdd()
    }

    return (
        <div 
            onClick = { props.bookmarkStatus === true ? remove :
                add } 
            className={styles.LikeButton} >
            <img  
                alt={ props.bookmarkStatus ? "Remove From gallery" : "Add To Gallery"} 
                src={ props.bookmarkStatus === true ? bookmarked : unbookmarked } 
                className={styles.likeIcon} />
        </div>)
};

export default LikeButton; 