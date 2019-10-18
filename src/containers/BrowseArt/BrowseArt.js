import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
import { Transition } from 'react-transition-group';
import ArtControls from '../ArtControls/ArtControls';

const BrowseArt = props => {
    
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const objectId = useSelector(state => state.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);
    // const error = useSelector(state => state.artwork.error)

    const [fadeArt, setFadeArt] = useState(true);
  
    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())}, 
        [dispatch]
    )

    // const letsNext = () => {
    //     console.log(`LETS NEXT`)
    //     onFetchArt();
    //     setFadeArt(true)
    // }


    useEffect ( () => {
        onFetchArt();
    }, [onFetchArt, objectId])
    // useEffect ( () => {
    //     setFadeArt(false)
    //    console.log(`In Use Effect Set Fade Art: ${fadeArt}`)
    // }, [fadeArt, primaryImage])

    // const transitionStyles = {
    //     entering: { opacity: 1},
    //     entered:  { opacity: 1},
    //     exiting:  { opacity: 1},
    //     exited:  { opacity: 1 }
    //   };

    return (
        <React.Fragment>

            {/* <Transition
                    in= {fadeArt}
                    timeout = {{ 
                        appear: 1000,
                        enter: 700,
                        exit: 700,} }>
                    { state => (
                        <div
                            style = {
                                { border: '1px solid blue'},
                                {transition: 'opacity 800ms ease-out forwards'},
                            
                                transitionStyles[state]
                            }> */}
                        <Artwork 
                            fadeArt = {fadeArt}
                            image = {primaryImageSmall}
                            altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} />  
                        {/* </div>
                    )}
            </Transition>  */}

            <ArtControls
                 title={title}
                 medium = {medium}
                 artistDisplayName = {artistDisplayName}
            />
            <div className={styles.nextButton} onClick = {onFetchArt}>LETS NEXT</div>

        </React.Fragment>
    )
}

export default BrowseArt;