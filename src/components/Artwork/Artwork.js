import React, { useState, useEffect } from  'react';
import styles from './Artwork.module.css';

import { Transition } from 'react-transition-group';


const Artwork = ( props ) => {

    // const [fadeArt, setFadeArt] = useState(false)

   

    //   useEffect ( () => {
    //       setFadeArt(true)
    //   },[fadeArt, props.image])


      
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
            
                        {/* <div className ={styles.imageCover}
                            style = {
                                transitionStyles[state]
                            }
                        ></div>  */}
                
               
    </div>   
    )
};

export default Artwork;
