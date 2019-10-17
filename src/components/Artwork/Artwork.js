import React from 'react';
import styles from './Artwork.module.css';



const Artwork = ( props ) => {

    return (
        <div className={ styles.Artwork }>
        <div className = { styles.primaryImage }
                style = {{
                    backgroundImage: `url(${props.image})` 
                }}
            > 
            </div>
        </div>
    )
};

export default Artwork;
