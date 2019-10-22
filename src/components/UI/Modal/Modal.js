import React from 'react';
import styles from './Modal.module.css';

const modal = ( props ) => {
    return (
        <React.fragment>
            <div className={ styles.Modal }>
                { props.children }
            </div>
        </React.fragment>
    )
}

export default modal;