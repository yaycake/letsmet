import React from 'react';
import styles from './Backdrop.module.css';

const backdrop = ( props ) => {
    return (
        <div className = {styles.Backdrop}>
            
            <p styles={{
                position: "absolute", 
                top: "0", 
                bottom: "0", 
                right: "0", 
                left: "0", 
                color: "black"
            }}> # This is the backdrop </p>
        </div>
    )
};

export default backdrop;