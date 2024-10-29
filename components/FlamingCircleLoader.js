import React from 'react';
import styles from '@/app/FlamingCircleLoader.module.css'

const FlamingCircleLoader = () => {
    return (
        <div className={styles.loaderContainer}>
                <div className={`${styles.fire}`}>
                    <div className={`${styles.red} ${styles.flame}`}></div>
                    <div className={`${styles.orange} ${styles.flame}`} ></div>
                    <div className={`${styles.yellow} ${styles.flame}`} ></div>
                    <div className={`${styles.white} ${styles.flame}`} ></div>
                </div>
        </div>
    );
};

export default FlamingCircleLoader;
