import React from  'react';
import styles from './Artwork.module.css';
import { NavLink } from 'react-router-dom'

const Artwork = ( props ) => {
    return (
        <div className ={styles.Artwork}>
            <NavLink 
                to={{
                    pathname: "/view",
                    altText: props.altText,
                    fullArtProps: {
                        title: props.title, 
                        imageUrl: props.image
                    }
                }}
                exact>
                <div 
                    className = { styles.primaryImage}
                    style = {{
                            backgroundImage: `url(${props.image})` 
                    }}
                    alt = {props.altText}
                    >  
                </div>    
            </NavLink>
        </div>   
    )
};

export default Artwork;