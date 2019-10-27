import React from 'react';
import styles from './PreviewTile.module.css';

const previewTile = ( props ) => {
    return (
        <div className = { styles.PreviewTile }
            onClick = { props.clicked }
            style = {{
                backgroundImage: `url(${props.image})`,
                backgroundSize: 'cover', 
                backgroundPosition:'center'

            }}
        >
        </div>
    )
}

export default previewTile;