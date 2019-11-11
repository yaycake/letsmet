import React, { useEffect, useCallback } from 'react';
import styles from './Gallery.module.css'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import PreviewTile from '../../components/PreviewTile/PreviewTile';


const Gallery = (props) => {
    //Redux Props
    const userGallery = useSelector(state => state.myGallery.gallery)
    const token = useSelector( state => state.auth.token)
    
    const error = useSelector(state => state.myGallery.error)
    const loading = useSelector(state => state.myGallery.loading)
  
    const userId = useSelector( state => state.auth.userId)

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback(()  => dispatch(actions.fetchGallery(token,userId)),[dispatch, token, userId])

    useEffect(() => {
        onSetGallery(token, userId)
    }, [onSetGallery, token, userId])

    const galleryTiles = (
        userGallery.map((art, index ) => 
            <PreviewTile
                activeTile = { props.curArtworkObjectId === art.objectId ? true : false }
                clicked = { () => props.clickedArt(
                    art.title,
                    art.artistDisplayName, 
                    art.medium,  
                    art.objectId,  
                    art.primaryImage,  
                    art.primaryImageSmall,
                    art.dataId, 
                    index
                ) }
                key = { art.objectId }
                altText = { art.title }
                image = {art.primaryImageSmall}
                id = { art.objectId }
            />)
    )

    return (
        <div className = { styles.GalleryFrame }>
            <div className = {styles.GalleryStrip}>
                { galleryTiles }
            </div>
        </div>
    )
}

export default Gallery;