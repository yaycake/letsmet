import React from 'react'
import styles from './Input.module.css'

const Input = ( props ) => {

    let inputElement = null; 

    const inputStyles = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched && props.value.length >= 4 ) {
        inputStyles.push(styles.Invalid)
    }

    let validationError = null;

    if (props.invalid && props.touched && props.value.length >= 4) {

        switch (props.label) {
            case ('email'): 
                validationError = 
                <p className={styles.ValidationError}> 
                Please enter a valid { props.label }</p>
            break;
            case ('password'):
                validationError = 
                <p className={styles.ValidationError}> 
                Password must be a minimum of 6 characters</p>   
            break;
            default: 
                validationError = 
                <p className={styles.ValidationError}> 
                Please enter a valid value</p>
        }
    }

    switch (props.elementType){
        case ('input'): 
        inputElement = 
            <input
                name = {props.label}
                onChange = { props.changed }
                className = { inputStyles.join(' ') }
                { ...props.elementConfig }
                value = { props.value }
            />
        break;
        case ('textarea'): 
        inputElement = 
            <textarea 
                onChange = { props.changed }
                className = { inputStyles.join(' ')}
            />
        break; 
        case ('select'):
            inputElement = (
                <select 
                    onChange = { props.changed }
                    className = { inputStyles.join(' ')}
                    value = { props.value } >
                        { props.elementConfig.options.map(
                            option => (
                                <option key = {option.value}
                                value = { option.value }>
                                    { option.displayValue }
                                </option>
                            )
                        )}
                </select>
            )
        break;

        default: 
            inputElement = <input 
                className = { inputStyles.join(' ')}
                {...props.elementConfig} 
                value = {props.value}
            />
    }


    return (
        <div className = {styles.Input}>
            <label className = {styles.Label}>{ props.label }</label>

            { inputElement }
            { validationError }
        </div>
           
        
    )
}

export default Input;