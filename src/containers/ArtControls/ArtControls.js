import React, { useState, useEffect, useCallback, useSelector } from 'react';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton'; 
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'; 
import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import styles from './ArtControls.module.css';

const ArtControls = (props) => {

    const [showArtInfo, setShowArtInfo] = useState(false);


    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    // const [showBookmarkClick, setBookmarkClick] = useState(() => {
    //     if (props.bookmarkStatus){
    //         return props.removeBookmark
    //     } else {
    //         return props.addBookmark
    //     }
    // })

    // const bookmarkToggle = () => {
    //     setBookmarkClick(!showBookmarkClick);
       
    // }

    return (
        <div className={styles.ArtControls}>
            <div className = {styles.infoBox}>
                <InfoButton showInfo = {showArtInfo} className={styles.infoButton} infoClicked={showInfoToggle}></InfoButton>
                <ArtInfo className=                 {styles.artInfo}
                    title={props.title}
                    medium = {props.medium}
                    artistDisplayName = {props.artistDisplayName}
                    showInfo = {showArtInfo}
                ></ArtInfo>
            </div>
            {/* { bookmarkButton } */}

         
            <LikeButton 
                bookmarkIcon = {props.bookmarkStatus}
                click = { props.clickBookmark }
            />
            
        </div>
    )
}

export default ArtControls;