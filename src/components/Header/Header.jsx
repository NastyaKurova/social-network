import React from 'react';
import logo from "../../logo.svg";
import styles from "./Header.module.scss";
import {Link} from "react-router-dom";


export const Header = ({isAuth, login, logoutUser}) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img className={styles.headerImg} src={logo} alt="logo"/>
                <h1 className={styles.headerText}>Social network </h1>
                <div className={styles.headerLogin}> {isAuth ? <div>
                    <span>{login}</span>
                    <button onClick={logoutUser}>logout</button>
                </div> : <Link to="/login">login</Link>}</div>

            </div>
        </header>
    );
};