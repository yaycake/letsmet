import React from 'react';
import styles from './PreviewStyle.module.css';

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