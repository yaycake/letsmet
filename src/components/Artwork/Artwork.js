import React, { useState, useEffect } from  'react';
import styles from './Artwork.module.css';

import { Transition } from 'react-transition-group';


const Artwork = ( props ) => {
    return (
        <div className ={styles.Artwork}>
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
