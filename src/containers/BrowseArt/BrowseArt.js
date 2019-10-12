import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import axios from '../../axios-art'

const BrowseArt = props => {
    const [ curArtwork, setArtwork ] = useState({})

    console.log(`[BrowseArt: curArtwork] ${curArtwork}`)

    console.log(curArtwork)

    const artwork = useSelector(state => state.artwork.artwork)

    console.log(`[BrowseArt: artwork]${curArtwork}`)

   useEffect( ()=> {
       onFetchArt();
   }, [])
    
    const error = useSelector(state => state.artwork.error)

    const dispatch = useDispatch();

    const onFetchArt = () => {dispatch(actions.startFetchArt())}

    return (
        <React.Fragment>
            <p>BrowseArt</p> n
            <Artwork 
                title = {curArtwork.title}
                primaryImage = {curArtwork.primaryImage}
            >
            </Artwork>   
            
        </React.Fragment>
        
    )
}





export default BrowseArt