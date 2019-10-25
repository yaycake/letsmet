import React, { useState } from 'react';
import styles from './Auth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
import NavigationLink from '../../components/Navigation/NavigationLink/NavigationLink'

const Auth = ( props ) => {

    const [authForm, setAuthForm] = useState(
        { 
            email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'YourEmail@Domain.com'
            }, 
            value: '', 
            validation: {
                required: true,
                isEmail: true
            }, 
            valid: false, 
            touched: false
            }, 
            password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Keep it secret'
            }, 
            value: '', 
            validation: {
                required: true, 
                minLength: 6
            }, 
            valid: false, 
            touched: false
            }
        }
    );

    // Redux Store Props

    const error = useSelector (state => state.auth.error);

    const loading =  useSelector( state=> state.auth.loading );


    // Redux Store Methods
    const dispatch = useDispatch();
    const onAuth = (email, password, isSignup) => {
        dispatch(actions.auth(email, password, isSignup))
    };

    const [isSignup, setIsSignup] = useState(true);
    
    const submitHandler = (event) => {
        event.preventDefault();
        onAuth(authForm.email.value, authForm.password.value, isSignup)
    }

    const switchAuthHandler = () => {
        setIsSignup(!isSignup);
    }

    const inputChangedHandler = (event, controlName) => {

        const updatedControls = 
            updateObject(authForm, 
                { [controlName]: updateObject(
                    authForm[controlName], {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, authForm[controlName]), 
                        touched: true
                })
            })
        setAuthForm(updatedControls)
    }

    let formElementsArray = [];

    for (let key in authForm ) {
        formElementsArray.push({
            id: key, 
            config: authForm[key]
        })
    }

    let authTitle = isSignup ? ["Surf & Curate", "Your Own Gallery"] : ["Welcome Back", "Lets Art"]

    const form = (
        formElementsArray.map(formElement => (  
                <Input
                    className = {styles.AuthInput}
                    key = {formElement.id}
                    label = {formElement.config.elementConfig.type}
                    elementType = {formElement.config.elementType}
                    elementConfig = { formElement.config.elementConfig}
                    value = {formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate = { formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed = { (event) => inputChangedHandler(event,formElement.id) }
                >
                </Input>
            
        ))
    )

    let errorMessage = null;

    if (error) {
        errorMessage = error.message.split( '_').join(' ')
    }

    return (
        <div className = {styles.Auth}>
            <div className = {styles.AuthTitle}>
                <div className = {styles.authTitle1}>
                    {authTitle[0]}
                </div>
                <div className = {styles.authTitle2}>
                    {authTitle[1]}
                </div>
            </div>
            <form onSubmit = {submitHandler} className = { styles.AuthForm }>
                { error ? <p className = {styles.errorMessage}>{errorMessage}! Try Again</p> : null }

                { loading ? <Spinner/> : form }

                <div className = {styles.formControls}>
                    <div className={styles.btnSign1}>
                        <Button 
                            btnType = "success" >
                                { isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </div>
                    
                    <div className ={styles.or}>or</div>

                    <div className = {styles.btnSign2}>
                        <Button 
                            clicked = { switchAuthHandler }
                            btnType = "success"
                            >
                                { isSignup ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </div>
                </div>
            </form>

            
            <div className = { styles.goBack}>
                    <NavigationLink path="/">Go Back</NavigationLink>
            </div>
                
                
            
        </div>
    )
};

export default Auth;


