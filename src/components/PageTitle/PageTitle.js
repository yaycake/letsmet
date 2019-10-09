import React from 'react';
import styles from './PageTitle.module.css';

const pageTitle = ( props ) => {
    const title = props.pageTitle.split(" ");

   return (
    <div className={ styles.PageTitle }>
        <div className={ styles.title1 }>{ title[0] }</div>
        <div className={ styles.title2 }>{ title[1] }</div>
    </div>
   )
};

export default pageTitle;