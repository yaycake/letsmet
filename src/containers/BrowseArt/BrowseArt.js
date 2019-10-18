import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
import ArtControls from '../ArtControls/ArtControls';

const BrowseArt = props => {
    
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const objectId = useSelector(state => state.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);
    // const error = useSelector(state => state.artwork.error)
  
    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())}, 
        [dispatch])

    useEffect ( () => {
        onFetchArt();
    }, [onFetchArt, objectId])
   

    return (
        <React.Fragment>
            <Artwork 
                fadeArt = {fadeArt}
                image = {primaryImageSmall}
                altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} />  
            <ArtControls
                 title={title}
                 medium = {medium}
                 artistDisplayName = {artistDisplayName}/>
            <div className={styles.nextButton} onClick = {onFetchArt}>LETS NEXT</div>
        </React.Fragment>
    )
}

export default BrowseArt;