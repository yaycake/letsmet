import React, {useState} from 'react'; 
import styles from './FullArt.module.css';
import { keyPressHandler } from '../../../shared/utility'

const FullArt = (props) => {

    // const [hovered, setHovered] = useState(false)

    // const keyPressHandler = (event) => {
    //     if (event.key === 'Enter') {
    //         props.click()
    //       }
    // }

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


