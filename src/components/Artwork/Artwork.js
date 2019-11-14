import React from  'react';
import styles from './Artwork.module.css';
import { Route, Redirect } from 'react-router-dom';
import FullArt from './FullArt/FullArt'


const Artwork = ( props ) => {

    return (
        <div 
            name = {`${props.title} by ${props.artistDisplayName}`}
            onClick = {props.clicked } className ={styles.Artwork}>
            <div 
                className = { styles.primaryImage}
                style = {{
                        backgroundImage: `url(${props.image})` 
                }}
                alt = {props.altText}
                >  
            </div>
  
        </div>   
    )
};

export default Artwork;