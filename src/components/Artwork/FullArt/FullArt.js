import React from 'react'; 
import styles from './FullArt.module.css'

const FullArt = (props) => {

    const backToBrowse = () => {
        props.history.push('/')
    }

    console.log(JSON.stringify(props))

    return (
        <div className = {styles.FullArt}>
            <div onClick={ ()=> backToBrowse }>X</div>
            <img 
                className = {styles.FullArtImage}
                alt = {`Title: ${props.title}`}
                src = { props.imageUrl}
            />
        </div>
    )
}

export default FullArt; 


