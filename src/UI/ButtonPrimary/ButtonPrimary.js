import React from 'react'
import styles from './ButtonPrimary.module.css'

const button = ( props ) => (
    <button className= { styles.ButtonPrimary }
    onClick = { props.clicked }>
        { props.children }
    </button>
)

export default button;