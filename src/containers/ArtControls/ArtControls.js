import React, { useState, useSelector } from 'react';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton'; 
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'; 
import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import styles from './ArtControls.module.css';

const ArtControls = (props) => {

    const [showArtInfo, setShowArtInfo] = useState(false);

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
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

            <LikeButton 
                click = { props.bookmark }
                />
        </div>
    )
}

export default ArtControls;