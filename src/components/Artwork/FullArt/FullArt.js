import React, {useState} from 'react'; 
import styles from './FullArt.module.css'

const FullArt = (props) => {

    const [hovered, setHovered] = useState(false)

    return (
        <div 
            className = {styles.FullArt} 
            onClick={ props.click}
        >
            <div className = {styles.FullArtImageWrap}>

                <img 
                    className = {styles.FullArtImage}
                    alt = {`Title: ${props.title}`}
                    src = { props.image }
                    // onMouseOut = { () => setHovered(false)}
                    // onMouseOver = {() => setHovered(true)}
                    // style = {{
                    //     transform: hovered ? 
                    //     'scale(1.5,1.5)' : null,

                    // }}
                />
            

            </div>
          
           
        </div>

    )
}

export default FullArt; 


