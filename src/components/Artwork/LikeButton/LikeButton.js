import React from 'react';
import styles from './LikeButton.module.css';
import bookmarked from '../../UI/Icons/bookmark_solid.svg'
import unbookmarked from '../../UI/Icons/bookmark_outline.svg'

const likeButton = ( props ) => {



    // let icon = (
    //     <img alt = "Bookmark this art" src={unbookmarked} className={styles.likeIcon} />)

    // if (props.bookmarkStyle === "solid"){
    //     icon = (<img alt = "Unbookmark this art" src={bookmarked} className={styles.likeIcon} />)
    // }
    return (
        <div onClick = {props.bookmarkAction} className={styles.LikeButton}
        >
            {/* {icon} */}

            <img  alt={ props.bookmarkStatus? "Remove From gallery" : "Add To Gallery"} src={props.bookmarkStatus ? bookmarked : unbookmarked} className={styles.likeIcon} />
            { `bookmarkStatus: ${props.bookmarkStatus}`}
        </div>)
};

export default likeButton; 