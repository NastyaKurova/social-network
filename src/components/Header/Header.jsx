import  React from 'react';
import logo from "../../logo.svg";
import styles from "./Header.module.scss"
export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
            <img className={styles.headerImg} src={logo}  alt="logo" />
            <h1 className={styles.headerText}>Social network </h1>
            </div>
        </header>
    );
};