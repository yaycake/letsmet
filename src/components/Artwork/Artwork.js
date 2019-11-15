import React from  'react';
import styles from './Artwork.module.css';
import { keyPressHandler } from '../../shared/utility'

const Artwork = ( props ) => {

    return (
        <div 
            tabIndex="0"
            name = {`${props.title} by ${props.artistDisplayName}`}
            onKeyPress = { (e) => keyPressHandler(e, props.clicked) } 
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