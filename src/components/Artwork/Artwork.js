import React from  'react';
import styles from './Artwork.module.css';
import { Route, Redirect } from 'react-router-dom';
import FullArt from './FullArt/FullArt'


const Artwork = ( props ) => {

    return (
        <div onClick = {props.clicked } className ={styles.Artwork}>
            <div 
                className = { styles.primaryImage}
                style = {{
                        backgroundImage: `url(${props.image})` 
                }}
                alt = {props.altText}
                >  
            </div>
            {/* <img altText = "Close Full View" src={} />     */}
  
        </div>   
    )
};

export default Artwork;