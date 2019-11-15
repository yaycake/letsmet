import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './LikeButton.module.css';
import bookmarked from '../../UI/Icons/bookmark_solid.svg'
import unbookmarked from '../../UI/Icons/bookmark_outline.svg'

import { keyPressHandler} from '../../../shared/utility'

const LikeButton = ( props ) => {
    const token = useSelector(state => state.auth.token)

    const [clickedAdd, setClickedAdd] = useState(false)

    const remove = () => { 
        props.bookmarkRemove(props.objectDataId) };

    const add = () => { 
        setClickedAdd(true)
        props.bookmarkAdd()
        setTimeout(()=> {
            setClickedAdd(false)
        }, 1000)
    };

    // If user is not signed in, set these actions X styles

    let buttonClick =  () => props.signIn()

    let styleClassNames = styles.likeIcon
    
    // But if user is sign in, set these actions X styles

    if (token !== null ) {
        styleClassNames = (clickedAdd ? [styles.likeIcon, styles.justBookmarked].join(' ') : 
        styles.likeIcon)

        buttonClick =  props.bookmarkStatus === true ? remove :
        add
    }

    return (
        <button 
            aria-label= "View Art Info"
            tabIndex="0"
            onKeyPress = { (e) => keyPressHandler(e, buttonClick) } 
            
            onClick = { buttonClick } 
            className={styles.LikeButton} >
            <img  
                arial-label = { props.bookmarkStatus ? 
                    "Click To Remove From gallery" : 
                    "Click To Add To Gallery" }
                alt = { props.bookmarkStatus ? 
                    "Remove From gallery" : 
                    "Add To Gallery" } 
                src = { props.bookmarkStatus === true ?     bookmarked : 
                    unbookmarked } 
                className={ styleClassNames } />

        </button>)
};

export default LikeButton; 