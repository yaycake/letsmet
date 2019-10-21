import React from 'react'
import styles from './Input.module.css'

const Input = ( props ) => {
    let inputElement = null; 

    const inputStyles = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched ) {
        inputStyles.push(styles.Invalid)
    }

    let validationError = null;

    if (props.invalid && props.touched) {
        validationError = 
        <p className={styles.ValidationError}>Please enter a valid value.</p>
    }

    return (
        <div>
            <label>{ props.label }</label>
            <input 
                // onChange={props.changed}
                className={inputStyles.join(' ')} {...props.elementConfig} 
                value={props.value}
            />

        </div>
           
        
    )
}

export default Input;