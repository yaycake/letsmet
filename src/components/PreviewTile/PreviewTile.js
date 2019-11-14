import React from 'react';
import styles from './PreviewTile.module.css';
import { keyPressHandler } from '../../shared/utility'

const previewTile = ( props ) => {

 let tileClasses = styles.PreviewTile

    if (props.activeTile){
        tileClasses = [styles.PreviewTile, styles.ActiveTile].join(' ')
    }

    return (
        <div 
            tabIndex = {props.index}
            onKeyPress = { (e) => keyPressHandler(e, props.clicked) } 
            onClick = { props.clicked }
            className = {styles.TileWrap}>
            <div 
                className = { tileClasses }
                style = {{
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: 'cover', 
                    backgroundPosition:'center'
                }} > </div>
        </div>
    )
}

export default previewTile;