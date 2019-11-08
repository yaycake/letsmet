import React from 'react'
import styles from './Error.module.css'

const error = (props) => {

    let errorMessage = props.message.split( '_').join(' ')

    return (
        <div className = {styles.errorMessage}>
            { errorMessage }
        </div>
    )
}

export default error;