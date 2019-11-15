import React from 'react';
import styles from './PreviewTile.module.css';
import { keyPressHandler } from '../../shared/utility'

const previewTile = ( props ) => {

 let tileClasses = styles.PreviewTile

    if (props.activeTile){
        tileClasses = [styles.PreviewTile, styles.ActiveTile].join(' ')
    }

    return (
        <li className = {styles.TileWrap}
            // tabIndex = {props.index}
            tabIndex = "0"
            onKeyPress = { (e) => keyPressHandler(e, props.clicked) } 
            onClick = { props.clicked }
            >
            <div 
                className = { tileClasses }
                style = {{
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: 'cover', 
                    backgroundPosition:'center'
                }} > </div>
        </li>
    )
}

export default previewTile;