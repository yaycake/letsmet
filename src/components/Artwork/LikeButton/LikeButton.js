import React, {useState, useEffect} from 'react';
import styles from './LikeButton.module.css';
import bookmarked from '../../UI/Icons/bookmark_solid.svg'
import unbookmarked from '../../UI/Icons/bookmark_outline.svg'

const LikeButton = ( props ) => {

    const [clickedAdd, setClickedAdd] = useState(false)

    useEffect ( ()=> {
        setClickedAdd(false)
    }, [setClickedAdd])

    const remove = () => { 
       
        props.bookmarkRemove(props.objectDataId) };

    const add = () => { 
        setClickedAdd(true)
        props.bookmarkAdd()
        setTimeout(()=> {
            setClickedAdd(false)
        }, 1000)
         };

  

    return (
        <div 
            onClick = { props.bookmarkStatus === true ? remove :
                add } 
            className={styles.LikeButton} >
            
            <img  
                alt = { props.bookmarkStatus ? "Remove From gallery" : "Add To Gallery"} 
                src = { props.bookmarkStatus === true ? bookmarked : unbookmarked } 
                className={
                    clickedAdd ? [styles.likeIcon, styles.justBookmarked].join(' ')
                    : 
                    styles.likeIcon} />
        </div>)
};

export default LikeButton; 