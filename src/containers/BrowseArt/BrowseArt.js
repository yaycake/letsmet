import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
// import ArtControls from '../ArtControls/ArtControls';
import NextButton from '../../components/NextButton/NextButton';
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'; 
import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton'; 
import Error from '../../components/UI/Error/Error'
import Spinner from '../../components/UI/Spinner/Spinner'
import PreviewTile from '../../components/PreviewTile/PreviewTile';
import Gallery from '../Gallery/Gallery'
import FullArt from '../../components/Artwork/FullArt/FullArt'
import ViewIcon from '../../components/UI/Icons/view.png';


const BrowseArt = props => {

    //Art redux props
        const title = useSelector( state => state.artwork.artwork.title);
        const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
        const medium = useSelector(state => state.artwork.artwork.medium);
        const curObjectId = useSelector(state => state.artwork.artwork.objectId);
        const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
        const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);
        const error = useSelector(state => state.artwork.error)
        const loading = useSelector(state => state.artwork.loading)

        const userGallery = useSelector(state => state.myGallery.gallery);
        const token = useSelector(state => state.auth.token);
        const userId = useSelector( state => state.auth.userId);
        let dataId = useSelector(state => state.myGallery.dataId)

    const [showArtInfo, setShowArtInfo] = useState(false);

    const [showFullArt, setShowFullArt] = useState(false);

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    const dispatch = useDispatch();

    const onFetchArt = () => {dispatch(actions.fetchArt())}  

    const onSetGallery = useCallback((token, userId) => dispatch(actions.fetchGallery(token, userId)),[dispatch]);

    useEffect(() => {
        if (token){
            onSetGallery(token, userId);
        }
    }, [onSetGallery, token, userId, dataId])

    const [curArtwork, setCurArtwork] = useState({
        title: title,
        artistDisplayName: artistDisplayName,
        medium: medium,  
        objectId: curObjectId,  
        primaryImage: primaryImage,  
        primaryImageSmall: primaryImageSmall, 
        dataId: dataId,
        index: null
    })

    useEffect(()=> {
        setCurArtwork({
            title: title,
            artistDisplayName: artistDisplayName,
            medium: medium,  
            objectId: curObjectId,  
            primaryImage: primaryImage,  
            primaryImageSmall: primaryImageSmall, 
            dataId: dataId,
        })
    }, [
        title, 
        artistDisplayName, 
        medium, 
        curObjectId, 
        primaryImage, 
        primaryImageSmall, 
        dataId
    ])

    const browseArtHandler = () => {
        console.log(`in browseArtHandler `)
        onFetchArt();
        setCurArtwork({
            title: title,
            artistDisplayName: artistDisplayName,
            medium: medium,  
            objectId: curObjectId,  
            primaryImage: primaryImage,  
            primaryImageSmall: primaryImageSmall, 
            dataId: dataId,
            index: null
        })
    }

    //set Bookmark settings
    const [isBookmarked, setBookmarked] = useState(null)

    const resetArtwork = (newIndex) => {
        // onSetGallery(token, userId);

        let nextArtwork = {...userGallery[newIndex]}
        if (newIndex < 0){
            nextArtwork = { ...userGallery[1]}
        }
        setCurArtwork({
            title: nextArtwork.title,
            artistDisplayName: nextArtwork.artistDisplayName,
            medium: nextArtwork.medium,  
            objectId: nextArtwork.objectId,  
            primaryImage: nextArtwork.primaryImage,  
            primaryImageSmall: nextArtwork.primaryImageSmall,
            dataId: nextArtwork.dataId
        })
    }

    const removeGallery = (objectDataId) => {
        console.log(`in removeGallery`)
        dispatch(actions.removeGallery(token, userId, 
            {   title: curArtwork.title, 
                artistDisplayName: curArtwork.artistDisplayName, 
                medium: curArtwork.medium, 
                objectId: curArtwork.objectId, 
                primaryImage: curArtwork.primaryImage, 
                primaryImageSmall: curArtwork.primaryImageSmall, 
                dataId: curArtwork.dataId
            }
        ))

        setBookmarked(false)
        resetArtwork(curArtwork.index -1)
        // onSetGallery(token, userId) 
    };

    const addGallery = (objectDataId) => {
            dispatch(actions.addGallery(token, userId, 
                {   title: title, 
                    artistDisplayName: artistDisplayName,
                    medium: medium, 
                    objectId: curObjectId, 
                    primaryImage: primaryImage, 
                    primaryImageSmall: primaryImageSmall
                }
            ))
            setBookmarked(true)  
    }

    const signInRedirect = () => {
        props.history.push("/auth")
    }

    const bookmarkCheck = useCallback(() => {
        console.log(`in bookmarkCheck`)
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === curArtwork.objectId)
    }, [curArtwork.objectId, userGallery])

     useEffect(() => {
        if (bookmarkCheck(curObjectId) === true ){
            setBookmarked(true) 
        } else {
            setBookmarked(false)
        }
    }, [bookmarkCheck, curObjectId])


    const selectArtPreviewHandler = (  
        title,
        artistDisplayName, 
        medium,  
        objectId,  
        primaryImage,  
        primaryImageSmall, 
        dataId, 
        index
    ) => {
        setCurArtwork({
            title: title,
            artistDisplayName: artistDisplayName, 
            medium: medium,  
            objectId: objectId,  
            primaryImage: primaryImage,  
            primaryImageSmall: primaryImageSmall, 
            dataId: dataId, 
            index: index
        })
    }   

    // If there is an error 
    let errorMessage = null;
    if (error) {
        errorMessage = <Error message={error.message}></Error>
    }

    const viewFullArtHandler= () => {
        setShowFullArt(!showFullArt)
    }

    const fullArt = (
        <FullArt 
            objectId = { curArtwork.objectId}
            title = {curArtwork.title}
            image = {curArtwork.primaryImage}
            click = { viewFullArtHandler }
        />
    )

    const artworkContent = (
        <div >
            <div onClick = { () => viewFullArtHandler()}>
                <Artwork 
                    objectId = { curArtwork.objectId}
                    title = {curArtwork.title}
                    image = {curArtwork.primaryImageSmall}
                    altText = {`Title: ${ curArtwork.title } by ${ curArtwork.artistDisplayName}. Medium: ${ curArtwork.medium }`} 
                /> 
            </div>
           
            <div className = {styles.ArtControls}>

                <div className = {styles.infoBox}>

                    <InfoButton
                        showinfo = {showArtInfo}
                        infoClicked = { showInfoToggle }
                    />
                    <ArtInfo
                        className = { styles.artInfo}
                        title = {curArtwork.title}
                        medium = { curArtwork.medium }
                        artistDisplayName = {curArtwork.artistDisplayName}
                        showInfo = {showArtInfo}
                    />
                </div>

                <LikeButton
                    bookmarkAdd = { addGallery }
                    bookmarkRemove = { removeGallery }
                    bookmarkStatus= {isBookmarked}
                    objectDataId = { dataId }
                    signIn = {signInRedirect}
                />

            </div>
        </div>
    )



    let browseArtContent = (
        <div>
            { error && errorMessage }
            { token && 
            <Gallery 
                clickedArt = { selectArtPreviewHandler }
                curArtworkObjectId = {curArtwork.objectId}
            />}
    
            { showFullArt ? fullArt : artworkContent }

            {showFullArt ? null : <NextButton clicked = { browseArtHandler } /> }
            
        </div>
    )

    return (
        <div className = { styles.BrowseArt }>
            { loading ? <Spinner></Spinner> : browseArtContent }
        </div>
    )
}

export default BrowseArt;