import React from 'react'; 
import styles from './FullArt.module.css'

const FullArt = (props) => {

    return (
        <div className = {styles.FullArt} onClick={ props.click}>
        <img 
            className = {styles.FullArtImage}
            alt = {`Title: ${props.title}`}
            src = { props.image }
        />
    </div>
    )
}

export default FullArt; 


