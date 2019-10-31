import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
import ArtControls from '../ArtControls/ArtControls';
import NextButton from '../../components/NextButton/NextButton';
import { removeGallery } from '../../store/actions/gallery';




const BrowseArt = props => {
    
    //redux props
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const curObjectId = useSelector(state => state.artwork.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const error = useSelector(state => state.artwork.error)

    const userGallery = useSelector(state => state.myGallery.gallery);

    const token = useSelector(state => state.auth.token);
    const userId = useSelector( state => state.auth.userId);

    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())}, [dispatch])
    
    useEffect (() => {
        onFetchArt();
    }, [onFetchArt])

    const onSetGallery = useCallback((token, userId) => dispatch(actions.fetchGallery(token,userId)),[dispatch]);

    useEffect(() => {
        onSetGallery(token, userId);
    }, [onSetGallery, token, userId])

    const bookmarkCheck = () => {
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === curObjectId)
    }

    const clickBookmarkHandler = () => {
        if (!token) {
            props.history.push("/auth")
        } else {
            bookmarkAction( bookmarkCheck())
        }
    }

    const bookmarkAction = ( bookmarked ) => {
        if(bookmarked) {
            return removeGallery()
        }else {
            return addGallery()
        }
    }

    const addGallery = () => {
        console.log(`in browseArt AddGallery`)
        dispatch(actions.addGallery(token, 
            {   title: title, 
                artistDisplayName: artistDisplayName, 
                medium: medium, 
                objectId: curObjectId, 
                primaryImage: primaryImage, 
                primaryImageSmall: primaryImageSmall
            }
        ))
    }

    // const removeGallery = () => {
    //     console.log(`in browseArt RemoveGallery`)
    //     dispatch(actions.removeGallery(token, {

    //     }))
    // }

    // const addBookmarkHandler = () => {
    //     console.log('Gallery.js: bookmarkArtHandler')
    //     if (!token) {
    //         props.history.push("/auth")
    //     } else {
    //         if (bookmarkCheck() === true ) {
    //             console.log(`art already bookmarked! ${bookmarkCheck()}`)
    //         } else {
    //             console.log(`Add to bookmarks! ${bookmarkCheck()}`)
    //             addGallery()
    //         }
            
    //     }
    // }

    // const removeBookmarkHandler = () => {
    //     console.log('Gallery.js: remove bookmark handler')
    //     removeGallery()
    //     alert("art removed!")
    // }
  

    return (
        <div className = { styles.BrowseArt }>
          
            <Artwork 
                image = {primaryImageSmall}
                altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} /> 
             
            <ArtControls
                isAuth = { token !== null }
                //bookmark functions & style
                fave = { addGallery }
                clickBookmark = {clickBookmarkHandler}
                // addBookmark = { addBookmarkHandler }
                // bookmarkStatus = { bookmarkCheck() }
                // removeBookmark = { removeBookmarkHandler }

                //art info 
                title={title}
                medium = {medium}
                artistDisplayName = {artistDisplayName}
                
                userGallery = { userGallery }
                curObjectId = { curObjectId }
                />

            <NextButton clicked = { onFetchArt } />
{/*         
            { bookmarkCheck() === true ? 
                <p>ONCHECK GALLERY TRUE</p>
                : <p>ONCHECK GALLERY FALSE</p>
            } */}
           
        </div>
    )
}

export default BrowseArt;