import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'

import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton';
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo';

import styles from './BrowseArt.module.css';

const BrowseArt = props => {
    
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const objectId = useSelector(state => state.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);
    // const error = useSelector(state => state.artwork.error)


    const [showArtInfo, setShowArtInfo] = useState(false);

    // const hideInfoHandler = () => {
    //     setShowArtInfo(false)
    // };

    // const showInfoHandler = () => {
    //     setShowArtInfo(true)
    // };

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())}, 
        [dispatch]
    )


   useEffect( ()=> {
       onFetchArt();
   }, [onFetchArt, objectId])

//    useEffect ( () => {
//     hideInfoHandler();
//    }, [title])
    
    
    return (
        <React.Fragment>
            
            <Artwork image = {primaryImageSmall}>
            </Artwork>   
            <div className={styles.ArtControls}>
                <div className = {styles.infoBox}>
                    <InfoButton className={styles.infoButton} infoClicked={showInfoToggle}></InfoButton>
                    <ArtInfo className={styles.artInfo}
                        title={title}
                        medium = {medium}
                        artistDisplayName = {artistDisplayName}
                        showInfo = {showArtInfo}
                    ></ArtInfo>
                    
                </div>
                <LikeButton></LikeButton>
            </div>
            
            <div className={styles.nextButton}onClick = {onFetchArt}>LETS NEXT</div>
            
        </React.Fragment>
        
    )
}





export default BrowseArt