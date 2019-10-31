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

    let bookmarkButton = (
        <div>
            <p>Art Not Bookmarked</p>
            <LikeButton 
                bookmarkIcon = {props.artBookmarked}
                click = { props.addBookmark }

            />
        </div>
        
    )

    if (props.bookmarkStatus === true)
        bookmarkButton = (
            <div>
                <p>Art Bookmarked</p>
                <LikeButton 
                    bookmarkIcon = {props.artBookmarked}
                    click = { props.removeBookmark }
                />
            </div>
        )
    return (
        <div className={styles.ArtControls}>
            <div className = {styles.infoBox}>
                <InfoButton showInfo = {showArtInfo} className={styles.infoButton} infoClicked={showInfoToggle}></InfoButton>
                <ArtInfo className={styles.artInfo}
                    title={props.title}
                    medium = {props.medium}
                    artistDisplayName = {props.artistDisplayName}
                    showInfo = {showArtInfo}
                ></ArtInfo>
            </div>
            { bookmarkButton }
        </div>
    )
}

export default ArtControls;