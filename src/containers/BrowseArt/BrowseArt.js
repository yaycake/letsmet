import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
import ArtControls from '../ArtControls/ArtControls';

import {Redirect } from 'react-router-dom'

const BrowseArt = props => {

    // const [curArtwork, setCurArtwork] = setState
    
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const objectId = useSelector(state => state.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);
    // const error = useSelector(state => state.artwork.error)

    const token = useSelector(state => state.auth.token)
  
    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())}, 
        [dispatch])

    const addGallery = (artwork => {
        dispatch(actions.addGallery(
            {
                title: title, 
                artistDisplayName: artistDisplayName, 
                medium: medium, 
                objectId: objectId, 
                primaryImage: primaryImage, 
                primaryImageSmall: primaryImageSmall
            }, token
        ))
    })

    const signInToFave = () => {
        
        return <Redirect to="/auth" />
    }

    const faveArtHandler = () => {
        if (token) {
            addGallery();
        } else {
            signInToFave()
        }
    }


    useEffect ( () => {
        onFetchArt();
    }, [onFetchArt, objectId])
   

    return (
        <div className = { styles.BrowseArt }>
            {/* <div className = {styles.browseArtPreview}> */}
                <Artwork 
                    image = {primaryImageSmall}
                    altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} /> 
            {/* </div> */}
             
            <ArtControls
                fave = { addGallery }
                title={title}
                medium = {medium}
                artistDisplayName = {artistDisplayName}/>
            <div className={styles.nextButton} onClick = {onFetchArt}>LETS NEXT</div>
        </div>
    )
}

export default BrowseArt;