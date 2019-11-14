export const updateObject = ( oldObject, objectUpdates ) => {
    return {
        ...oldObject, 
        ...objectUpdates
    }
}

const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const checkValidity = (value, rules) => {
    let isValid = true; 

    if (rules.validation.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.validation.isEmail) {
        isValid = validateEmail(value);
    }
    if (rules.validation.minLength) {
        isValid = value.length >= rules.validation.minLength && isValid
    }
    return isValid;
    
}


export const keyPressHandler = (event, func) => {
    if (event.key === 13) {
        func()
    }
}