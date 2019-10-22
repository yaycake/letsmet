import React from 'react';
import styles from './About.module.css'; 

const About = props => {
    return (
        <div className = {styles.About}>
          
            <div className={styles.LeftStrip}>
                <div className={styles.DoYou}>Do You</div>
                <div className={styles.LoveArt1}> Love Art </div>
                <div className={styles.LoveArt2}> Love Art </div>
                <div className={styles.LoveArt3}> Love Art </div>
            </div>

            <div className={styles.RightStrip}>
                <div className={styles.LoveArt4}> Love Art </div>
                <div className={styles.LoveArt5}> Love Art </div>
                <div className={styles.LoveArt6}> Love Art </div>
                <div className={styles.LoveArt7}> Love Art </div>
            </div>

            <div className = {[styles.DesignAnd, styles.AboutHead].join(' ')}>
                Design And
            </div>
            <div className = {[styles.CodeBy, styles.AboutHead].join(' ')}>Code By</div>
            <div className={[styles.Grace, styles.AboutHead].join(' ')}>Grace Yang</div>

            <div className={styles.BuiltIn}>
                <p>Built in React</p>
                <p>Powered by MetMuseum.github.io</p>
                <p>The Music Is In Your Head</p>
            </div>
            <div className={styles.FindMeAt}>Find Me At</div>
            <div className={styles.thegraceyang}>
                <a title = "Go To Grace's Website" alt="Grace Yang Website" href="http://www.thegraceyang.com" target="_blank ">thegraceyang.com</a>
            </div>
        </div>)
}

export default About;