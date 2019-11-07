import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
// import ArtControls from '../ArtControls/ArtControls';
import NextButton from '../../components/NextButton/NextButton';
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'; 
import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton'; 


const BrowseArt = props => {

    //redux props
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const curObjectId = useSelector(state => state.artwork.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);

    let dataId = useSelector(state => state.myGallery.dataId)

    const error = useSelector(state => state.artwork.error)

    const userGallery = useSelector(state => state.myGallery.gallery);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector( state => state.auth.userId);

    const [showArtInfo, setShowArtInfo] = useState(false);

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())}, [dispatch])
    
    useEffect (() => {
        onFetchArt();
    }, [onFetchArt])

    const onSetGallery = useCallback((token, userId) => dispatch(actions.fetchGallery(token,userId)),[dispatch]);

    useEffect(() => {
        if (token){
            onSetGallery(token, userId);
        }
    }, [onSetGallery, token, userId, dataId])


    const myRef = useRef();

    useEffect(()=> {
        myRef.current = dataId
    }, [dataId])


    //set Bookmark settings
    const [showBookmarked, setBookmarked] = useState({
        isBookmarked: null, 
        action: null, 
        style: null
     })

     const removeGallery = (objectDataId) => {
        console.log(`[browseArt RemoveGallery]`)
        console.log(`[browseArt removeGallery] ${title}`)
        console.log(`[browseArt removeGallery] dataId: ${JSON.stringify(dataId)}`)
        
        dispatch(actions.removeGallery(token, 
            {
                title: title, 
                artistDisplayName: artistDisplayName, 
                medium: medium, 
                objectId: curObjectId, 
                primaryImage: primaryImage, 
                primaryImageSmall: primaryImageSmall, 
                dataId: dataId
            }
        ))
        setBookmarked({
            isBookmarked: false
        })
        onSetGallery(token, userId) 
    }

    const addGallery = (objectDataId) => {
        console.log(`in browseArt AddGallery`)
        if (!token) {
            props.history.push("/auth")
        } else {
            dispatch(actions.addGallery(token, 
                {   title: title, 
                    artistDisplayName: artistDisplayName,
                    medium: medium, 
                    objectId: curObjectId, 
                    primaryImage: primaryImage, 
                    primaryImageSmall: primaryImageSmall
                }
            ))
            setBookmarked({
                isBookmarked: true, 
                style: "solid"
            })  
          
        }
    }

    const bookmarkCheck = (ObjectId) => {
        console.log(`in bookmarkCheck: title: ${ title }`)
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === ObjectId)
    }

    const initBookmark = () => {
        console.log(`in initBookmark`)
        if (bookmarkCheck(curObjectId) === true ){
            setBookmarked({
                isBookmarked: true, 
                // style: "solid"
            }) 
        } else {
            setBookmarked({
               isBookmarked: false, 
            //    style: "outline"
            })
        }
    }

    useEffect(() => {
        initBookmark()
    }, [curObjectId])

    return (
        <div className = { styles.BrowseArt }>
          
            <Artwork 
                image = {primaryImageSmall}
                altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} /> 
            

            <div className = {styles.ArtControls}>
                <div className = {styles.infoBox}>
                    <InfoButton
                        showinfo = {showArtInfo}
                        infoClicked = { showInfoToggle }
                    />
                    <ArtInfo
                        className = { styles.artInfo}
                        title = {title}
                        medium = { medium }
                        artistDisplayName = {props.artistDisplayName}
                        showInfo = {showArtInfo}
                    />
                </div>
                <LikeButton
                    bookmarkAdd = { addGallery }
                    bookmarkRemove = { removeGallery }
                    bookmarkStatus= {showBookmarked.isBookmarked}
                    objectDataId = { dataId }
                    // bookmarkStyle = { showBookmarked.style}
                />
            </div>
            <NextButton clicked = { onFetchArt } />
           
        </div>
    )
}

export default BrowseArt;