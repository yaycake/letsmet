import React from 'react';
import {useSelector} from 'react-redux'
import styles from './PageTitle.module.css';
import { NavLink } from 'react-router-dom';

const PageTitle = ( props ) => {
    const token = useSelector(state => state.auth.token)
    const title = props.pageTitle.split(" ");

    let title1Style = styles.title1;

    if (token) {
        title1Style = styles.signedInTitle1
    }
   return (
    <NavLink tabIndex="0" className={ styles.PageTitle } to="/">
        <div>
            <div style = {{position: "relative"}}>
                <div className={ title1Style }>{ title[0] }</div>
                <div className={ styles.title2 }>{ title[1] }</div>
            </div>
        </div>
    </NavLink>
   )
};

export default PageTitle;