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

    console.log(`VALUE$$:${value}`)
    console.log(`rules.required$$:${rules.validation.required}`)
    console.log(`rules.minLength$$:${rules.validation.minLength}`)
  

    if (rules.validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.validation.isEmail) {
        isValid = validateEmail(value);
    }

    if (rules.validation.minLength) {
        isValid = value.length >= rules.validation.minLength && isValid
        console.log('in minlength vlaid')
        console.log(rules.minLength)
    }

    console.log(`IS DIS VALID? ${isValid}`)
    return isValid;
    
}