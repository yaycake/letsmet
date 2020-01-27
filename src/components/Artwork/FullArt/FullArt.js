import React from 'react'; 
import styles from './FullArt.module.css';
import { keyPressHandler } from '../../../shared/utility'

const FullArt = (props) => {

    return (
        <div 
            className = {styles.FullArt} 
            onClick={ props.click}
        >
            <div 
                tabIndex="0"
                className = {styles.FullArtImageWrap}
                onKeyPress = { (e) => keyPressHandler(e, props.click) }    
            >
                <img 
                    className = {styles.FullArtImage}
                    alt = {`Title: ${props.title}`}
                    src = { props.image }
                />
            </div>
        </div>
    )
}

export default FullArt; 


