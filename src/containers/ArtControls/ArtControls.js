import React, { useState, useSelector } from 'react';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton'; 
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'; 
import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import styles from './ArtControls.module.css';

const ArtControls = (props) => {

    if (props.curBookmarkedStyle){
        console.log("BOOKMARK IS TRUE")
    }


    const [showArtInfo, setShowArtInfo] = useState(false);

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }


    let bookmarkButton = (
        <LikeButton 
            bookmarkStyle = "outline"
            click = { props.bookmark }
        />
    )

    if (props.checkBookmark){
        
        let bookmarkButton = (
            <LikeButton 
                bookmarkStyle = "solid"
                click = {props.removeBookmark}
            />
        )
    }

   

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
            {/* <LikeButton 
                click = { props.bookmark }
                /> */}
        </div>
    )
}

export default ArtControls;