import React from 'react';
import styles from './PageTitle.module.css';
import { NavLink } from 'react-router-dom';

const pageTitle = ( props ) => {
    const title = props.pageTitle.split(" ");

   return (
    <NavLink className={ styles.PageTitle } to="/">
        <div>
            <div style = {{position: "relative"}}>
                <div className={ styles.title1 }>{ title[0] }</div>
                <div className={ styles.title2 }>{ title[1] }</div>
            </div>
        </div>
    </NavLink>
   
   )
};

export default pageTitle;