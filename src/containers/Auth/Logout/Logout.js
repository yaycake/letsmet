import React, {useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import * as actions from '../../../store/actions/index'
import {Redirect} from 'react-router-dom'

const Logout = props => {
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(actions.logout())
    }, [dispatch])

    useEffect( ()=> {
        onLogout()
    }, [onLogout])

    console.log('IN LOGOUT')

    return (
        <Redirect to="/"></Redirect>
    )
};

export default Logout; 
