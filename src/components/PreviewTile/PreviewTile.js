import React from 'react';
import styles from './PreviewTile.module.css';

const previewTile = ( props ) => {

 let tileClasses = styles.PreviewTile

    if (props.activeTile){
        tileClasses = [styles.PreviewTile, styles.ActiveTile].join(' ')
    }

    return (
        <div className = {styles.TileWrap}>
             <div className = { tileClasses }
                onClick = { props.clicked }
                style = {{
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: 'cover', 
                    backgroundPosition:'center'
                }} > </div>
        </div>
    )
}

export default previewTile;