import React, {useState} from 'react';
import styles from './Artwork.module.css';

import LikeButton from './LikeButton/LikeButton';
import InfoButton from './InfoButton/InfoButton';
import { useDispatch, useSelector } from 'react-redux'

const Artwork = ( props ) => {

    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const objectId = useSelector(state => state.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImage);
    const primaryImageSmall = useSelector(state => state.artwork.primaryImageSmall)

    return (
        <div className={ styles.Artwork }>
            <p>Artwork Component</p>
            <div className = { styles.primaryImage }
                style = {{
                    backgroundImage: `url(${primaryImage})` 
                }}
            > 
            </div>
            <div>
                <InfoButton></InfoButton>
                <p>art info: </p>
                <p>{title}</p>
                <p>{medium}</p>
                <p>{artistDisplayName}</p>
                <LikeButton></LikeButton>
            </div>
            
        </div>
    )
};

export default Artwork;
