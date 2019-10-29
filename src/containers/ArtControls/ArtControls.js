import React, { useState, useEffect, useCallback, useSelector } from 'react';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton'; 
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'; 
import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import styles from './ArtControls.module.css';

const ArtControls = (props) => {

    const [showArtInfo, setShowArtInfo] = useState(false);

    // let artMark = null; 

    // const bookmarkCheckkk = useCallback(() => {

    //     if (props.userGallery.some(art => art.objectId === props.curObjectId)){
    //         artMark = true
    //         console.log('ARTMARK IS TRUE!!')
    //     } else {
    //         console.log('ARTMARK STAYS FALSE')
    //     }
    // }, [])

    // useEffect(() => {
    //     bookmarkCheckkk()
    // }, [bookmarkCheckkk, props.userGallery, props.curObjectId])


    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    let bookmarkButton = (
        <LikeButton 
            bookmarkIcon = {props.artBookmarked}
            click = { props.addBookmark }
    
        />
    )

    // if (artMark){

    //     bookmarkButton = (
    //         <LikeButton 
    //             bookmarked = { false }
    //             click = {props.removeBookmark}
    //         />
    //     )
    // }

   

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