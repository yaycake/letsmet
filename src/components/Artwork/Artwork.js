import React from 'react';
import styles from './Artwork.module.css';

import LikeButton from './LikeButton/LikeButton';
import InfoButton from './InfoButton/InfoButton';

const artwork = ( props ) => {
    
    return (
        <div className={ styles.Artwork }>
        
            <div className = { styles.primaryImage }
                styles = {{
                    backgroundImage: props.primaryImage, 
                }}
            > 
            </div>

            <div>
                <InfoButton></InfoButton>
                <LikeButton></LikeButton>
            </div>
            
        </div>
    )
};

export default artwork;
