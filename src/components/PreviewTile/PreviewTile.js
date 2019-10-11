import React from 'react';
import styles from './PreviewTile.module.css';

const previewTile = ( props ) => {
    return (
        <div className = { styles.PreviewTile }
            styles = {{
                backgroundImage: props.primaryImage
            }}
        >
        </div>
    )
}

export default previewTile;