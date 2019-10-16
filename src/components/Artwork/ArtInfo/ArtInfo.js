import React from 'react'; 
import styles from './ArtInfo.module.css';

const artInfo = (props ) => {
    return (
        <div onClick={ props.clicked } className={styles.ArtInfo}
            style = {{
                opacity: props.showInfo ? 1 : 0
            }}
        >
            <p><strong>{props.title} </strong></p>
            <p> {props.medium} | {props.artistDisplayName}</p>
        </div>
    )
}

export default artInfo;